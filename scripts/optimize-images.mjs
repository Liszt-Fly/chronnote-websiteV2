#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');
const publicImagesDir = path.join(publicDir, 'images');

const DEFAULT_THRESHOLD_BYTES = 500 * 1024;
const DEFAULT_QUALITY = 80;

function parseArgs(argv) {
  const options = {
    thresholdBytes: DEFAULT_THRESHOLD_BYTES,
    quality: DEFAULT_QUALITY,
    dryRun: false,
    deleteOriginal: true,
    force: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--keep-original') options.deleteOriginal = false;
    else if (arg === '--force') options.force = true;
    else if (arg === '--threshold' || arg.startsWith('--threshold=')) {
      const value = arg.includes('=') ? arg.split('=')[1] : argv[++i];
      options.thresholdBytes = Number(value);
    } else if (arg === '--quality' || arg.startsWith('--quality=')) {
      const value = arg.includes('=') ? arg.split('=')[1] : argv[++i];
      options.quality = Number(value);
    } else if (arg === '--help' || arg === '-h') {
      printHelpAndExit();
    } else {
      console.error(`Unknown arg: ${arg}`);
      printHelpAndExit(1);
    }
  }

  if (!Number.isFinite(options.thresholdBytes) || options.thresholdBytes <= 0) {
    console.error(`Invalid --threshold: ${options.thresholdBytes}`);
    process.exit(1);
  }
  if (
    !Number.isFinite(options.quality) ||
    options.quality < 1 ||
    options.quality > 100
  ) {
    console.error(`Invalid --quality: ${options.quality}`);
    process.exit(1);
  }

  return options;
}

function printHelpAndExit(code = 0) {
  console.log(`
Usage:
  node scripts/optimize-images.mjs [options]

Options:
  --threshold <bytes>     Only optimize images larger than this (default: ${DEFAULT_THRESHOLD_BYTES})
  --quality <1-100>       WebP quality (default: ${DEFAULT_QUALITY})
  --dry-run               Report changes but don't write files
  --keep-original          Don't delete originals after rewriting references
  --force                 Re-generate output even if it already exists
  -h, --help              Show this help
`);
  process.exit(code);
}

function isSkippableDir(name) {
  return (
    name === 'node_modules' ||
    name === '.next' ||
    name === '.git' ||
    name === 'dist' ||
    name === 'build' ||
    name === 'out'
  );
}

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkFiles(p));
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

function getMaxWidthForImage(filePath) {
  const rel = path.relative(publicImagesDir, filePath).split(path.sep).join('/');
  if (rel.startsWith('docs/')) return 1400;
  if (rel.startsWith('blog/')) return 1400;
  if (rel.startsWith('media/')) return 2000;
  return 1600;
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function isBinaryLikely(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    ext === '.png' ||
    ext === '.jpg' ||
    ext === '.jpeg' ||
    ext === '.webp' ||
    ext === '.avif' ||
    ext === '.gif' ||
    ext === '.mp4' ||
    ext === '.mov' ||
    ext === '.webm' ||
    ext === '.zip' ||
    ext === '.pdf'
  );
}

function isTextFile(filePath) {
  if (isBinaryLikely(filePath)) return false;
  const ext = path.extname(filePath).toLowerCase();
  return (
    ext === '.md' ||
    ext === '.mdx' ||
    ext === '.ts' ||
    ext === '.tsx' ||
    ext === '.js' ||
    ext === '.jsx' ||
    ext === '.mjs' ||
    ext === '.cjs' ||
    ext === '.json' ||
    ext === '.yml' ||
    ext === '.yaml' ||
    ext === '.css' ||
    ext === '.scss' ||
    ext === '.txt'
  );
}

function walkTextFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!isSkippableDir(ent.name)) out.push(...walkTextFiles(p));
      continue;
    }
    if (ent.isFile() && isTextFile(p)) out.push(p);
  }
  return out;
}

async function generateWebp(inputPath, outputPath, { quality, force, dryRun }) {
  if (!force && fs.existsSync(outputPath)) return { wrote: false };

  const maxWidth = getMaxWidthForImage(inputPath);
  const tmpPath = `${outputPath}.tmp.webp`;

  if (!dryRun) {
    const scaleFilter = `scale='if(gt(iw,${maxWidth}),${maxWidth},iw)':-2`;
    const res = spawnSync(
      'ffmpeg',
      [
        '-hide_banner',
        '-loglevel',
        'error',
        '-y',
        '-i',
        inputPath,
        '-vf',
        scaleFilter,
        '-f',
        'webp',
        '-c:v',
        'libwebp',
        '-q:v',
        String(quality),
        '-pix_fmt',
        'yuva420p',
        tmpPath,
      ],
      { stdio: 'inherit' }
    );
    if (res.status !== 0) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      throw new Error(`ffmpeg failed for ${inputPath}`);
    }
    fs.renameSync(tmpPath, outputPath);
  }
  return { wrote: true, maxWidth };
}

function collectPublicImageCandidates(options) {
  if (!fs.existsSync(publicImagesDir)) return [];

  const files = walkFiles(publicImagesDir);
  const candidates = [];

  for (const filePath of files) {
    const base = path.basename(filePath);
    if (base.includes('_raw.')) continue;

    const ext = path.extname(base).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;

    const size = fs.statSync(filePath).size;
    if (size < options.thresholdBytes) continue;

    candidates.push({ filePath, size });
  }

  candidates.sort((a, b) => b.size - a.size);
  return candidates;
}

function buildReplacementPairs(oldPublicRelPosix, newPublicRelPosix) {
  const oldUrl = `/${oldPublicRelPosix}`;
  const newUrl = `/${newPublicRelPosix}`;
  const oldImport = `@/public/${oldPublicRelPosix}`;
  const newImport = `@/public/${newPublicRelPosix}`;
  const oldPublicPath = `public/${oldPublicRelPosix}`;
  const newPublicPath = `public/${newPublicRelPosix}`;

  return [
    [oldUrl, newUrl],
    [oldImport, newImport],
    [oldPublicPath, newPublicPath],
  ];
}

function applyReplacementsToFile(filePath, replacements, { dryRun }) {
  const before = fs.readFileSync(filePath, 'utf8');
  let after = before;
  for (const [from, to] of replacements) {
    if (!from) continue;
    after = after.split(from).join(to);
  }
  if (after === before) return { changed: false };
  if (!dryRun) fs.writeFileSync(filePath, after, 'utf8');
  return { changed: true };
}

function anyTextFileContains(textFiles, needles) {
  for (const filePath of textFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const needle of needles) {
      if (needle && content.includes(needle)) return true;
    }
  }
  return false;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)}KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)}MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)}GB`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(publicDir)) {
    console.error(`Missing public dir: ${publicDir}`);
    process.exit(1);
  }
  if (!fs.existsSync(publicImagesDir)) {
    console.error(`Missing public/images dir: ${publicImagesDir}`);
    process.exit(1);
  }

  const candidates = collectPublicImageCandidates(options);
  if (candidates.length === 0) {
    console.log(
      `No images >= ${formatBytes(options.thresholdBytes)} to optimize under public/images (excluding *_raw.*).`
    );
    return;
  }

  const textFiles = walkTextFiles(repoRoot);

  let convertedCount = 0;
  let replacedFilesCount = 0;
  let originalBytes = 0;
  let optimizedBytes = 0;
  let deletedCount = 0;
  const keptOriginals = [];

  for (const { filePath, size } of candidates) {
    originalBytes += size;

    const oldPublicRel = path.relative(publicDir, filePath);
    const oldPublicRelPosix = toPosix(oldPublicRel);
    const newPublicRelPosix = oldPublicRelPosix.replace(/\.(png|jpe?g)$/i, '.webp');
    const outputPath = path.join(publicDir, newPublicRelPosix.split('/').join(path.sep));

    const gen = await generateWebp(filePath, outputPath, options);
    const outSize = fs.existsSync(outputPath) ? fs.statSync(outputPath).size : 0;
    optimizedBytes += outSize;
    convertedCount += 1;

    const replacements = buildReplacementPairs(oldPublicRelPosix, newPublicRelPosix);
    const changedPaths = new Set();

    for (const tf of textFiles) {
      const res = applyReplacementsToFile(tf, replacements, options);
      if (res.changed) changedPaths.add(tf);
    }

    replacedFilesCount += changedPaths.size;

    const leftoverNeedles = replacements.map(([from]) => from);
    const stillReferenced = anyTextFileContains(textFiles, leftoverNeedles);

    if (options.deleteOriginal) {
      if (stillReferenced) {
        keptOriginals.push(oldPublicRelPosix);
      } else if (!options.dryRun) {
        fs.unlinkSync(filePath);
        deletedCount += 1;
      }
    }

    console.log(
      `${options.dryRun ? '[dry-run] ' : ''}${oldPublicRelPosix} -> ${newPublicRelPosix}  ${formatBytes(size)} -> ${formatBytes(outSize)} (max ${gen.maxWidth}w)`
    );
  }

  console.log('');
  console.log(`Optimized images: ${convertedCount}`);
  console.log(`Text files updated: ${replacedFilesCount}`);
  console.log(`Original bytes (sum): ${formatBytes(originalBytes)}`);
  console.log(`Optimized bytes (sum): ${formatBytes(optimizedBytes)}`);
  console.log(
    `Estimated savings: ${formatBytes(Math.max(0, originalBytes - optimizedBytes))}`
  );
  if (options.deleteOriginal) {
    console.log(`Deleted originals: ${deletedCount}`);
    if (keptOriginals.length > 0) {
      console.log(`Kept originals (still referenced):`);
      for (const rel of keptOriginals) console.log(`- ${rel}`);
    }
  } else {
    console.log(`Kept originals: --keep-original`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
