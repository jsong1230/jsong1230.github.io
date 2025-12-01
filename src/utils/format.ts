/**
 * 텍스트 포맷팅 유틸리티 함수
 */

/**
 * 마크다운 스타일의 **bold** 텍스트를 HTML <strong> 태그로 변환하고 스타일을 적용합니다.
 * @param text - 변환할 텍스트
 * @returns HTML로 변환된 텍스트
 */
export function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-semibold">$1</strong>');
}


