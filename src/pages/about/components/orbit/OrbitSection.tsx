import ArrowButton from '@shared/components/button/ArrowButton';
import { OrbitingCircles } from './OrbitingCircles';
import BlurLayer from './BlurLayer';
import OrbitTextBox from './OrbitTextBox';
import { ORBIT_CONFIG } from '@pages/about/constants/orbit';
import { FaCircle } from 'react-icons/fa6';

// 오빗 섹션 렌더링 컴포넌트
const OrbitSectionRenderer = ({
  list,
  className,
}: {
  list: (typeof ORBIT_CONFIG)[keyof typeof ORBIT_CONFIG];
  className: string;
}) => {
  return (
    <div className={`${className}`}>
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

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop */}
      <div className="hidden lg:block">
        <OrbitSectionRenderer list={ORBIT_CONFIG.desktop} className="h-[100dvh]" />
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <OrbitSectionRenderer list={ORBIT_CONFIG.tablet} className="h-[100dvh]" />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <OrbitSectionRenderer list={ORBIT_CONFIG.mobile} className="h-[100dvh]" />
      </div>

      {/* Overlay Components */}
      <BlurLayer />
      <OrbitTextBox />
      <div className="animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50 md:hidden">
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default OrbitSection;
