import { FaCircle } from 'react-icons/fa6';

import { OrbitingCircles } from './OrbitingCircles';
import BlurLayer from './BlurLayer';
import OrbitTextBox from './OrbitTextBox';
import { ORBIT_CONFIG } from '@pages/about/constants/orbit';

// 오빗 섹션 렌더링 컴포넌트
const OrbitSectionRenderer = ({
  list,
  className,
}: {
  list: (typeof ORBIT_CONFIG)[keyof typeof ORBIT_CONFIG];
  className: string;
}) => {
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
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
  return (
    <div className="relative w-full">
      {/* Desktop */}
      <div className="hidden lg:block">
        <OrbitSectionRenderer list={ORBIT_CONFIG.desktop} className="h-screen" />
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <OrbitSectionRenderer list={ORBIT_CONFIG.tablet} className="h-screen" />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <OrbitSectionRenderer list={ORBIT_CONFIG.mobile} className="h-[100dvh]" />
      </div>

      {/* Overlay Components */}
      <BlurLayer />
      <OrbitTextBox />
    </div>
  );
};

export default OrbitSection;
