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
  const settings = {
    dots: VALUES_DATA.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
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
