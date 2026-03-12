'use client';

import { useState } from 'react';
import { useLanguage } from '../utils/language';

export default function Newsletter() {
  const [lang] = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(lang === 'ko' ? '유효한 이메일을 입력해주세요' : 'Please enter a valid email');
      return;
    }

    setStatus('loading');

    // Note: You'll need to implement the actual subscription logic
    // Options:
    // 1. Mailchimp API
    // 2. ConvertKit
    // 3. Buttondown
    // 4. Custom API endpoint

    // For now, we'll just show a success message
    setTimeout(() => {
      setStatus('success');
      setMessage(
        lang === 'ko'
          ? '구독해주셔서 감사합니다! 새로운 포스트를 이메일로 보내드리겠습니다.'
          : 'Thank you for subscribing! You\'ll receive new posts via email.'
      );
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 my-12">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-2">
          {lang === 'ko' ? '📰 뉴스레터 구독' : '📰 Subscribe to Newsletter'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {lang === 'ko'
            ? '최신 블로그 포스트와 업데이트를 이메일로 받아보세요.'
            : 'Get the latest blog posts and updates delivered to your inbox.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === 'ko' ? 'your@email.com' : 'you@email.com'}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {lang === 'ko' ? '구독 중...' : 'Subscribing...'}
              </span>
            ) : status === 'success' ? (
              lang === 'ko' ? '구독 완료!' : 'Subscribed!'
            ) : (
              lang === 'ko' ? '구독하기' : 'Subscribe'
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          {lang === 'ko'
            ? '스팸을 보내지 않습니다. 언제든 구독을 취소할 수 있습니다.'
            : 'No spam, ever. Unsubscribe anytime.'}
        </p>
      </div>
    </div>
  );
}
