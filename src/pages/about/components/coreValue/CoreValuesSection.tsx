import SubTitle from '@shared/components/SubTitle';
import CoreValueCard from '@pages/about/components/coreValue/CoreValueCard';
import { SUB_TITLE } from '@pages/about/constants/about';
import { CORE_VALUE_DATA } from '@pages/about/constants/coreValue';
import { useCarousel } from '@/shared/hooks/carousel/useEmblaCarousel';
import Carousel from '@shared/components/Carousel';
import '@pages/about/styles/carousel.css';

const CoreValuesSection = () => {
  const { emblaRef, selectedIndex, scrollTo } = useCarousel();

  return (
    <section className="w-full max-w-[100vw] py-[6.25rem] md:pt-[12.56rem] md:pb-[15.5rem] lg:py-[10.25rem]">
      <SubTitle subTitle={SUB_TITLE.CORE_VALUE} subDescription={SUB_TITLE.CORE_VALUE_DESCRIPTION} />

      {/* 모바일: 캐러셀 */}
      <div className="md:hidden">
        <Carousel emblaRef={emblaRef} selectedIndex={selectedIndex} scrollTo={scrollTo} carouselData={CORE_VALUE_DATA}>
          {CORE_VALUE_DATA.map((data) => (
            <div key={data.keyword} className="embla__slide">
              <CoreValueCard
                keyword={data.keyword}
                description={data.description}
                cardImage={data.image}
                highlightedWord={data.highlightedWord}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hidden md:mt-[6.25rem] md:flex md:justify-center lg:mt-[5rem]">
        {/* 태블릿/데스크톱: 그리드 */}
        <div className="md:grid md:grid-cols-3 md:gap-[1rem] lg:gap-[1.5rem]">
          {CORE_VALUE_DATA.map((data) => (
            <CoreValueCard
              key={data.keyword}
              keyword={data.keyword}
              description={data.description}
              cardImage={data.image}
              highlightedWord={data.highlightedWord}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
