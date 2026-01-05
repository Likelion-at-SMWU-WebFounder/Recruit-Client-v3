import { useEffect, useState } from 'react';
import { ABOUT_US_IMAGES_PATH } from '@pages/home/constants/about';

const BASE_CARD_CLASS = 'rounded-[1.25rem] transition-all duration-700 ease-in-out';
const DESKTOP_TABLET_CARD_MAIN_CLASS =
  'md:h-[36rem] md:w-[41rem] lg:h-[30.5rem] lg:w-[150rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)]';
const DESKTOP_TABLET_CARD_SIDE_CLASS =
  'md:h-[22rem] md:w-[39rem] lg:h-[22.5rem] lg:w-[40rem] rounded-[1.25rem] opacity-60';
const MOBILE_CARD_CLASS = 'w-[22.5rem] h-[11rem] rounded-[1.25rem]';

export const AboutCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = ABOUT_US_IMAGES_PATH.length;

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  const getIndex = (offset: number) => {
    return (currentIndex + offset + total) % total;
  };

  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <div className="hidden overflow-hidden md:mt-[6rem] md:flex md:items-center md:justify-center md:gap-[1rem] lg:gap-[3rem]">
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(-1)]}
          alt="숙명여대 멋쟁이사자처럼 1"
          className={BASE_CARD_CLASS + DESKTOP_TABLET_CARD_SIDE_CLASS}
        />
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(0)]}
          alt="숙명여대 멋쟁이사자처럼 2"
          className={BASE_CARD_CLASS + DESKTOP_TABLET_CARD_MAIN_CLASS}
        />
        <img
          src={ABOUT_US_IMAGES_PATH[getIndex(1)]}
          alt="숙명여대 멋쟁이사자처럼 "
          className={BASE_CARD_CLASS + DESKTOP_TABLET_CARD_SIDE_CLASS}
        />
      </div>

      {/* 모바일 */}
      <div className="flex w-full items-center justify-center overflow-hidden p-[1.25rem_1rem] md:hidden">
        <img
          src={ABOUT_US_IMAGES_PATH[currentIndex]}
          alt="숙명여대 멋쟁이사자처럼"
          className={BASE_CARD_CLASS + MOBILE_CARD_CLASS}
        />
      </div>
    </>
  );
};

export default AboutCard;
