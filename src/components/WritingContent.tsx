'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/language';

interface WritingContentProps {
  postsData: Array<{
    id: string;
    title: string;
    date: string;
    lang: string;
    excerpt?: string;
    tags?: string[];
    category?: string;
  }>;
}

export default function WritingContent({ postsData }: WritingContentProps) {
  const [lang] = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Array<{
    id: string;
    title: string;
    date: string;
    lang: string;
    excerpt?: string;
    tags?: string[];
    category?: string;
  }>>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Use postsData prop directly
    const allPosts = postsData || [];

    // Extract all unique tags
    const tags = new Set<string>();
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());

    // Filter posts by language
    let filteredPosts = allPosts
      .filter(post => post.lang === lang)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

    // Apply tag filter
    if (selectedTag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags?.includes(selectedTag)
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);
        const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || excerptMatch || tagMatch;
      });
    }

    setPosts(filteredPosts);
  }, [postsData, lang, searchQuery, selectedTag]);

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 text-inherit px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="container-narrow py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
        {lang === 'ko' ? 'Writing' : 'Writing'}
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'ko' ? '포스트 검색...' : 'Search posts...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {(searchQuery || selectedTag) && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {lang === 'ko'
              ? `${posts.length}개의 포스트를 찾았습니다`
              : `Found ${posts.length} post${posts.length !== 1 ? 's' : ''}`}
          </p>
        )}
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {lang === 'ko' ? '태그 필터' : 'Filter by Tag'}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                !selectedTag
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {lang === 'ko' ? '전체' : 'All'}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-400">
          {searchQuery
            ? (lang === 'ko'
                ? `"${searchQuery}"에 대한 검색 결과가 없습니다`
                : `No posts found for "${searchQuery}"`)
            : (lang === 'ko'
                ? '블로그 포스트가 여기에 표시됩니다. (준비 중)'
                : 'Blog posts will be displayed here. (Coming soon)')}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold flex-1">
                  <a
                    href={`/writing/${post.id}?lang=${lang}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {searchQuery ? highlightText(post.title, searchQuery) : post.title}
                  </a>
                </h2>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.category && (
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    {post.category}
                  </span>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {searchQuery
                  ? highlightText(post.excerpt ? post.excerpt.replace(/^#{1,6}\s+/gm, '').trim() : '', searchQuery)
                  : (post.excerpt ? post.excerpt.replace(/^#{1,6}\s+/gm, '').trim() : '')}
              </p>
              <a 
                href={`/writing/${post.id}?lang=${lang}`}
                className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
              >
                {lang === 'ko' ? '→ 더 읽기' : '→ Read more'}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
