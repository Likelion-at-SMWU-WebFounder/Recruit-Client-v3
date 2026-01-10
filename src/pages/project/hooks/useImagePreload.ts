import { useEffect } from 'react';

interface UseImagePreloadOptions {
  // 이미지 URL 배열 (eager loading용)
  imageUrls: string[];
  // preload를 활성화할지 여부 (기본값: true)
  enabled?: boolean;
}

// 이미지 preload를 관리하는 커스텀 훅
const useImagePreload = ({ imageUrls, enabled = true }: UseImagePreloadOptions) => {
  useEffect(() => {
    if (!enabled || imageUrls.length === 0) return;

    const links: HTMLLinkElement[] = [];

    imageUrls.forEach((url) => {
      if (!url) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      // cleanup: preload link 제거
      links.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [imageUrls, enabled]);
};

export default useImagePreload;
