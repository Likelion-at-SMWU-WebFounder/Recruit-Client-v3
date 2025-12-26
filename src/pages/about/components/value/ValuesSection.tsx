import SubTitle from '@shared/components/SubTitle';
import ValueCard from '@/pages/about/components/value/ValueCard';
import { SUB_TITLE } from '@pages/about/constants/index';
import { VALUES_DATA } from '@/pages/about/constants/values';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@pages/about/styles/carousel.css';

const ValuesSection = () => {
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

  return (
    <section className="w-full max-w-[100vw] py-[6.25rem] md:pt-[12.56rem] md:pb-[15.5rem] lg:py-[10.25rem]">
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />

      {/* 모바일: 캐러셀 */}
      <div className="md:hidden">
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

      <div className="hidden md:mt-[6.25rem] md:flex md:justify-center lg:mt-[5rem]">
        {/* 태블릿/데스크톱: 그리드 */}
        <div className="md:grid md:grid-cols-3 md:gap-[1rem] lg:gap-[1.5rem]">
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

export default ValuesSection;
