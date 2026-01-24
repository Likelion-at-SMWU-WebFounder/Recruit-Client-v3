import { useEffect, useState } from 'react';

interface UseImageManagerOptions {
  // 단일 이미지 URL (로드 상태 추적용)
  imageUrl?: string;
  // 이미지 URL 배열 (preload용)
  imageUrls?: string[];
  // 이미지 로드 추적을 활성화할지 여부 (단일 이미지일 때만 사용, 기본값: true)
  trackLoad?: boolean;
  // preload를 활성화할지 여부 (배열일 때만 사용, 기본값: true)
  enabled?: boolean;
}

interface UseImageManagerReturn {
  // 이미지 로드 상태 (단일 이미지 + trackLoad=true일 때만 반환)
  isImageLoaded?: boolean;
}

/**
 * 이미지 로드 상태 추적 및 preload를 관리하는 통합 커스텀 훅
 *
 * @example
 * // 단일 이미지 로드 상태 추적
 * const { isImageLoaded } = useImageManager({
 *   imageUrl: 'path/to/image.jpg',
 *   trackLoad: true
 * });
 *
 * @example
 * // 여러 이미지 preload
 * useImageManager({
 *   imageUrls: ['path/to/image1.jpg', 'path/to/image2.jpg'],
 *   enabled: true
 * });
 */
const useImageManager = ({
  imageUrl,
  imageUrls,
  trackLoad = true,
  enabled = true,
}: UseImageManagerOptions): UseImageManagerReturn => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // 단일 이미지 로드 상태 추적
  useEffect(() => {
    if (!imageUrl || !trackLoad) {
      setIsImageLoaded(false);
      return;
    }

    const img = new Image();

    const handleLoad = () => {
      setIsImageLoaded(true);
    };

    const handleError = () => {
      // 이미지 로드 실패 시에도 표시 (에러 처리)
      setIsImageLoaded(true);
    };

    // 이벤트 리스너를 먼저 등록 (race condition 방지)
    img.onload = handleLoad;
    img.onerror = handleError;

    // src 설정
    img.src = imageUrl;

    // 이미지가 이미 캐시되어 있는 경우 (src 설정 후 체크)
    if (img.complete) {
      setIsImageLoaded(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
      img.src = ''; // 로딩 중단
    };
  }, [imageUrl, trackLoad]);

  // 여러 이미지 preload
  useEffect(() => {
    if (!enabled || !imageUrls || imageUrls.length === 0) return;

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

  // 단일 이미지 + trackLoad일 때만 로드 상태 반환
  return trackLoad && imageUrl ? { isImageLoaded } : {};
};

export default useImageManager;
