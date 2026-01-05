import ArrowButton from '@shared/components/button/ArrowButton';
import { combineStyles } from '@shared/utils/combineStyles';
import { OrbitingCircles } from './OrbitingCircles';
import BlurLayer from './BlurLayer';
import OrbitTextBox from './OrbitTextBox';
import { ORBIT_CONFIG } from '@pages/about/constants/orbit';
import { FaCircle } from 'react-icons/fa6';

// OrbitSection 스타일 상수화
const ORBIT_SECTION_STYLES = {
  container: {
    base: 'relative w-full overflow-hidden',
  },
  desktop: {
    base: 'hidden',
    desktop: 'lg:block',
  },
  tablet: {
    base: 'hidden',
    tablet: 'md:block',
    desktop: 'lg:hidden',
  },
  mobile: {
    base: 'block',
    tablet: 'md:hidden',
  },
  orbitHeight: {
    base: 'h-[100dvh]',
  },
  arrowButton: {
    base: 'animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50',
    tablet: 'md:hidden',
  }, // 모바일 버전에서 화살표 버튼 숨김
} as const;

/// 오빗 섹션 렌더링 컴포넌트
const OrbitSectionRenderer = ({
  list,
  className,
}: {
  list: (typeof ORBIT_CONFIG)[keyof typeof ORBIT_CONFIG];
  className: string;
}) => {
  return (
    <div className={className}>
      {list.map((conf, i) => (
        <OrbitingCircles key={i} radius={conf.radius} reverse={conf.reverse} lineTransparency={conf.lineTransparency}>
          {conf.icons?.map((color: string, idx: number) => (
            <FaCircle key={idx} className={color === 'blue' ? 'text-blue' : 'text-orange'} />
          ))}
        </OrbitingCircles>
      ))}
    </div>
  );
};

// 최종 오빗 섹션 컴포넌트 - 반응형 설정
const OrbitSection = () => {
  const handleScrollDown = () => {
    const valuesSection = document.getElementById('values-section');
    if (valuesSection) {
      valuesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerClassName = combineStyles(ORBIT_SECTION_STYLES.container);
  const desktopClassName = combineStyles(ORBIT_SECTION_STYLES.desktop);
  const tabletClassName = combineStyles(ORBIT_SECTION_STYLES.tablet);
  const mobileClassName = combineStyles(ORBIT_SECTION_STYLES.mobile);
  const orbitHeightClassName = combineStyles(ORBIT_SECTION_STYLES.orbitHeight);
  const arrowButtonClassName = combineStyles(ORBIT_SECTION_STYLES.arrowButton);

  return (
    <div className={containerClassName}>
      {/* Desktop */}
      <div className={desktopClassName}>
        <OrbitSectionRenderer list={ORBIT_CONFIG.desktop} className={orbitHeightClassName} />
      </div>

      {/* Tablet */}
      <div className={tabletClassName}>
        <OrbitSectionRenderer list={ORBIT_CONFIG.tablet} className={orbitHeightClassName} />
      </div>

      {/* Mobile */}
      <div className={mobileClassName}>
        <OrbitSectionRenderer list={ORBIT_CONFIG.mobile} className={orbitHeightClassName} />
      </div>

      {/* Overlay Components */}
      <BlurLayer />
      <OrbitTextBox />
      <div className={arrowButtonClassName}>
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default OrbitSection;
