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
    <div className="project-carousel mb-[2rem] w-full">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={index === 0 ? '프로젝트 썸네일' : `프로젝트 이미지 ${index}`}
              loading="lazy"
              className="mx-auto w-full object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectCarousel;
