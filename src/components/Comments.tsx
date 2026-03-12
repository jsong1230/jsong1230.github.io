'use client';

import { useEffect } from 'react';
import { useLanguage } from '../utils/language';

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [lang] = useLanguage();

  useEffect(() => {
    // Giscus configuration
    // Note: You need to:
    // 1. Enable Discussions in your GitHub repo settings
    // 2. Install the giscus app: https://github.com/apps/giscus
    // 3. Update data-repo to your actual repo

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'jsong1230/jsong1230.github.io'); // Update this
    script.setAttribute('data-repo-id', 'R_kgDOabcdefg'); // Get from giscus.app
    script.setAttribute('data-category', 'Announcements'); // Or 'General'
    script.setAttribute('data-category-id', 'DIC_kwDOabcdefg'); // Get from giscus.app
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', lang === 'ko' ? 'ko' : 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = document.getElementById('giscus-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [postId, lang]);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-6">
        {lang === 'ko' ? '댓글' : 'Comments'}
      </h3>
      <div id="giscus-container" className="min-h-[200px]" />
    </div>
  );
}
