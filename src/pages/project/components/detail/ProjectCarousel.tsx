import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@pages/project/styles/carousel.css';
import ArrowButton from '@shared/components/button/ArrowButton';
import Skeleton from '@shared/components/loading/Skeleton';

interface ProjectCarouselProps {
  images: string[];
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  currentSlide?: number;
  totalSlides?: number;
}

interface CarouselImageProps {
  image: string;
  index: number;
}

const CarouselImage = ({ image, index }: CarouselImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 이미지가 이미 로드되어 있는지 확인 (브라우저 캐시)
  useEffect(() => {
    setIsImageLoaded(false);
    setHasError(false);
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-[0.75rem] md:rounded-[1rem] lg:rounded-[1.25rem]">
      {(!isImageLoaded || hasError) && (
        <div className="absolute inset-0">
          <Skeleton width="100%" height="100%" className="rounded-[0.75rem] md:rounded-[1rem] lg:rounded-[1.25rem]" />
        </div>
      )}
      <img
        ref={imgRef}
        src={image}
        alt={index === 0 ? '프로젝트 썸네일' : `프로젝트 이미지 ${index}`}
        loading="lazy"
        className={`mx-auto w-full rounded-[0.75rem] object-contain transition-opacity duration-300 md:rounded-[1rem] lg:rounded-[1.25rem] ${
          isImageLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '200px' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

const ProjectCarousel = ({ images }: ProjectCarouselProps) => {
  const carouselImages = images;
  const [currentSlide, setCurrentSlide] = useState(0);

  // 이전 화살표 컴포넌트
  const PrevArrow = ({ style, onClick, currentSlide = 0 }: ArrowProps) => {
    // 첫 번째 슬라이드일 때 화살표 숨김
    if (currentSlide === 0) {
      return null;
    }

    return (
      <div
        className="project-carousel-custom-arrow"
        style={{
          ...style,
          display: 'block',
          left: '2rem',
          zIndex: 1,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        onClick={onClick}>
        <ArrowButton iconColor="gray" onArrowBtnClick={onClick || (() => {})} direction="left" />
      </div>
    );
  };

  // 다음 화살표 컴포넌트
  const NextArrow = ({ style, onClick, currentSlide = 0, totalSlides = 0 }: ArrowProps) => {
    // 마지막 슬라이드일 때 화살표 숨김
    if (currentSlide === totalSlides - 1) {
      return null;
    }

    return (
      <div
        className="project-carousel-custom-arrow"
        style={{
          ...style,
          display: 'block',
          right: '2rem',
          zIndex: 1,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        onClick={onClick}>
        <ArrowButton iconColor="gray" onArrowBtnClick={onClick || (() => {})} />
      </div>
    );
  };

  const settings = {
    dots: carouselImages.length > 1,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    nextArrow: <NextArrow currentSlide={currentSlide} totalSlides={carouselImages.length} />,
    afterChange: (index: number) => {
      setCurrentSlide(index);
    },
  };

  return (
    <div className="project-carousel mb-[2rem] min-h-[200px] w-full">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <CarouselImage image={image} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectCarousel;
