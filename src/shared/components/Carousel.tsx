import type { EmblaViewportRefType } from 'embla-carousel-react';

interface CarouselProps {
  emblaRef: EmblaViewportRefType;
  selectedIndex: number;
  scrollTo: (index: number) => void;
  carouselData: Record<string | number, string | number | boolean>[];
  children: React.ReactNode;
}

const Carousel = ({ emblaRef, selectedIndex, scrollTo, carouselData, children }: CarouselProps) => {
  return (
    <>
      {/* 화면에 띄울 캐러셀 컴포넌트 */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
      {/* 페이지네이션 점 */}
      <div className="embla__dots">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            type="button"
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
