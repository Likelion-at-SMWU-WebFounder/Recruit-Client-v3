// components/RecruitPartSection.tsx
import { useEffect, useState } from 'react';
import { SECTION_TITLES, RECRUIT_PARTS, SECTION_SUB_TITLES } from '../../constants/index';
import img3dOrange from '../../assets/3d-orange.png';
import img3dBlue from '../../assets/3d-blue.png';
import img3dGreen from '../../assets/3d-green.png';
import SubTitle from '@/shared/components/SubTitle';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cx } from '../../utils/cx';
import RecruitPartCard from './RecruitPartCard';
import { TW } from '../../styles/recruitPartSection.styles';

const PART_IMAGES = [img3dOrange, img3dBlue, img3dGreen] as const;

const RecruitPartSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMdUp = useMediaQuery('(min-width: 768px)');
  const isLgUp = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!isMdUp) setIsExpanded(false);
  }, [isMdUp]);

  // 모바일 스와이프
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (diff > 50 && currentSlide < RECRUIT_PARTS.length - 1) setCurrentSlide((v) => v + 1);
      else if (diff < -50 && currentSlide > 0) setCurrentSlide((v) => v - 1);

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  // 데스크탑 hover / 태블릿 click 분기
  const handleEnter = () => {
    if (isLgUp) setIsExpanded(true);
  };
  const handleLeave = () => {
    if (isLgUp) setIsExpanded(false);
  };
  const handleToggleTablet = () => {
    if (isMdUp && !isLgUp) setIsExpanded((v) => !v);
  };

  // 회전 각도 설정
  const ROTATIONS = [-18.63, 0, 18.63];

  return (
    <section className={TW.section}>
      <div className={TW.container}>
        <div className={TW.headingBox}>
          <SubTitle
            mode="light"
            align="center"
            subTitle={SECTION_SUB_TITLES.GENERATION}
            subDescription={SECTION_TITLES.RECRUIT_PART}
          />
        </div>

        {/* mobile */}
        <div className={TW.mobileWrap}>
          <div className={TW.mobileCarousel} onTouchStart={handleTouchStart}>
            {RECRUIT_PARTS.map((part, index) => {
              const isActive = index === currentSlide;
              const offset = index - currentSlide;

              return (
                <RecruitPartCard
                  key={part.id}
                  partIndex={index}
                  variant="mobile"
                  isActive={isActive}
                  slideTransform={`translateX(${offset * 19}rem)`}
                  TW={TW}
                  images={PART_IMAGES}
                />
              );
            })}
          </div>

          <div className={TW.indicatorWrap}>
            {RECRUIT_PARTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cx(TW.dotBase, currentSlide === index ? TW.dotActive : TW.dotIdle)}
              />
            ))}
          </div>
        </div>

        {/* tablet/desktop */}
        <div
          className={TW.desktopWrap}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={handleToggleTablet}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleToggleTablet();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleToggleTablet();
          }}>
          {RECRUIT_PARTS.map((part, idx) => (
            <RecruitPartCard
              key={part.id}
              partIndex={idx}
              variant={isExpanded ? 'expanded' : 'folded'}
              isExpanded={isExpanded}
              rotation={ROTATIONS[idx]}
              TW={TW}
              images={PART_IMAGES}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitPartSection;
