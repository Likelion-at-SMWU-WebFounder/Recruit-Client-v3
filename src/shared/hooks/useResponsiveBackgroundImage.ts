import { useEffect, useState } from 'react';

interface ResponsiveImagePaths {
  mobile: string;
  tablet: string;
  desktop: string;
}

/**
 * 반응형 배경 이미지를 관리하는 훅
 * @param imagePaths - 모바일, 태블릿, 데스크톱 이미지 경로 객체
 * @returns 배경 이미지 URL (CSS backgroundImage 형식: url(...))
 */
const useResponsiveBackgroundImage = (imagePaths: ResponsiveImagePaths): string => {
  const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1440);

  const [backgroundImage, setBackgroundImage] = useState(() => {
    const width = getWidth();
    const imagePath = width <= 768 ? imagePaths.mobile : width <= 1024 ? imagePaths.tablet : imagePaths.desktop;
    return `url(${imagePath})`;
  });

  useEffect(() => {
    const getImagePath = (width: number): string => {
      if (width <= 768) return imagePaths.mobile;
      if (width <= 1024) return imagePaths.tablet;
      return imagePaths.desktop;
    };

    const handleResize = () => {
      setBackgroundImage(`url(${getImagePath(getWidth())})`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagePaths.mobile, imagePaths.tablet, imagePaths.desktop]);

  return backgroundImage;
};

export default useResponsiveBackgroundImage;
