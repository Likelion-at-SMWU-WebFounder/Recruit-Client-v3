import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@pages/project/styles/carousel.css';
import ArrowButton from '@shared/components/button/ArrowButton';

interface ProjectCarouselProps {
  images: string[];
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface CarouselImageProps {
  image: string;
  index: number;
}

const CarouselImage = ({ image, index }: CarouselImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 이미지가 이미 로드되어 있는지 확인 (브라우저 캐시)
  useEffect(() => {
    setIsImageLoaded(false);
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="bg-gray/40 relative flex min-h-[200px] items-center justify-center rounded-[0.75rem] md:rounded-[1rem] lg:rounded-[1.25rem]">
      <img
        ref={imgRef}
        src={image}
        alt={index === 0 ? '프로젝트 썸네일' : `프로젝트 이미지 ${index}`}
        loading="lazy"
        className={`mx-auto w-full rounded-[0.75rem] object-contain transition-opacity duration-300 md:rounded-[1rem] lg:rounded-[1.25rem] ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '200px' }}
        onLoad={handleImageLoad}
        onError={() => setIsImageLoaded(true)}
      />
    </div>
  );
};

const ProjectCarousel = ({ images }: ProjectCarouselProps) => {
  const carouselImages = images;

  // 다음 화살표 컴포넌트
  const NextArrow = ({ style, onClick }: ArrowProps) => {
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    nextArrow: <NextArrow />,
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
