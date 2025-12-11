'use client';

import Script from 'next/script';

/**
 * Baidu Analytics (百度统计)
 *
 * https://tongji.baidu.com
 */
export default function BaiduAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cc89425c1c4bb8fcec0a54e4d0ac677c";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}

