import SubTitle from '@shared/components/SubTitle';
import ValueCard from '@/pages/about/components/value/ValueCard';
import { combineStyles } from '@shared/utils/combineStyles';
import { SUB_TITLE } from '@pages/about/constants/index';
import { VALUES_DATA } from '@/pages/about/constants/values';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@pages/about/styles/carousel.css';

// ValueSection 스타일 상수화
const VALUES_SECTION_STYLES = {
  section: {
    base: 'w-full max-w-[100vw] py-[6.25rem]',
    tablet: 'md:pt-[12.56rem] md:pb-[15.5rem]',
    desktop: 'lg:py-[10.25rem]',
  },
  mobileCarousel: {
    base: 'md:hidden',
  },
  desktopGrid: {
    base: 'hidden',
    tablet: 'md:mt-[6.25rem] md:flex md:justify-center',
    desktop: 'lg:mt-[5rem]',
  },
  grid: {
    base: 'md:grid md:grid-cols-3 md:gap-[1rem]',
    desktop: 'lg:gap-[1.5rem]',
  },
} as const;

const ValueSection = () => {
  // 캐러셀 설정
  const settings = {
    dots: VALUES_DATA.length > 1, // 캐러셀 점 표시 여부 (데이터 개수가 1개 이상일 때만 표시)
    infinite: true, // 무한 반복 여부
    speed: 500, // 슬라이드 속도
    slidesToShow: 1, // 한 번에 보여지는 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤되는 슬라이드 수
    autoplay: true, // 자동 재생 여부
    autoplaySpeed: 3000, // 3초마다 자동 재생
    pauseOnHover: true, // 마우스 오버 시 정지 여부
    pauseOnFocus: true, // 포커스 시 정지 여부
    arrows: false, // 화살표 표시 여부
  };

  const sectionClassName = combineStyles(VALUES_SECTION_STYLES.section);
  const mobileCarouselClassName = combineStyles(VALUES_SECTION_STYLES.mobileCarousel);
  const desktopGridClassName = combineStyles(VALUES_SECTION_STYLES.desktopGrid);
  const gridClassName = combineStyles(VALUES_SECTION_STYLES.grid);

  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />

      {/* 모바일: 캐러셀 */}
      <div className={mobileCarouselClassName}>
        <div className="values-carousel w-full">
          <Slider {...settings}>
            {VALUES_DATA.map((data) => (
              <div key={data.keyword}>
                <ValueCard keyword={data.keyword} description={data.description} cardImage={data.image} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className={desktopGridClassName}>
        {/* 태블릿/데스크톱: 그리드 */}
        <div className={gridClassName}>
          {VALUES_DATA.map((data) => (
            <ValueCard
              key={data.keyword}
              keyword={data.keyword}
              description={data.description}
              cardImage={data.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
