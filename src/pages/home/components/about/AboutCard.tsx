import { useEffect, useState } from 'react';
import { ABOUT_US_IMAGES_PATH } from '@pages/home/constants/about';

const BASE_CARD_CLASS = 'rounded-[1.25rem] transition-all duration-700 ease-in-out';
const DESKTOP_TABLET_CARD_MAIN_CLASS = 'shrink-0 object-cover md:w-[42rem] md:h-[36rem] lg:w-[66.5rem] lg:h-[30.5rem]';
const DESKTOP_TABLET_CARD_SIDE_CLASS = 'shrink-0 object-cover md:w-[39rem] md:h-[22rem] lg:w-[40rem] lg:h-[22.5rem]';
const MOBILE_CARD_CLASS = 'w-[22.5rem] h-[11rem]';

export const AboutCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const total = ABOUT_US_IMAGES_PATH.length;

  // 자동 슬라이드
  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout | null = null;
    const interval = setInterval(() => {
      setIsFading(true);

      fadeTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
        setIsFading(false);
      }, 350);
    }, 3000);
    return () => {
      clearInterval(interval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);

  const getIndex = (offset: number) => {
    return (currentIndex + offset + total) % total;
  };

  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <div className="hidden overflow-hidden md:inline-flex md:items-center md:justify-center md:gap-[1rem] lg:gap-[3rem]">
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(-1)]}
          alt="숙명여대 멋쟁이사자처럼 1"
          className={`${BASE_CARD_CLASS} ${DESKTOP_TABLET_CARD_SIDE_CLASS} ${isFading ? 'opacity-0' : 'opacity-60'}`}
        />
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(0)]}
          alt="숙명여대 멋쟁이사자처럼 2"
          className={`${BASE_CARD_CLASS} ${DESKTOP_TABLET_CARD_MAIN_CLASS} ${isFading ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(1)]}
          alt="숙명여대 멋쟁이사자처럼 3"
          className={`${BASE_CARD_CLASS} ${DESKTOP_TABLET_CARD_SIDE_CLASS} ${isFading ? 'opacity-0' : 'opacity-60'}`}
        />
      </div>

      {/* 모바일 */}
      <div className="flex w-full items-center justify-center overflow-hidden p-[1.25rem_1rem] md:hidden">
        <img
          src={ABOUT_US_IMAGES_PATH[currentIndex]}
          alt="숙명여대 멋쟁이사자처럼"
          className={`${BASE_CARD_CLASS} ${MOBILE_CARD_CLASS} ${isFading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
    </>
  );
};

export default AboutCard;
