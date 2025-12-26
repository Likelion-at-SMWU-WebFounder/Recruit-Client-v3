import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@pages/project/styles/carousel.css';

interface ProjectCarouselProps {
  thumbnail: string;
  images?: string[];
}

const ProjectCarousel = ({ thumbnail, images }: ProjectCarouselProps) => {
  // thumbnail을 맨 앞에 두고, images가 있으면 뒤에 추가
  const carouselImages = images && images.length > 0 ? [thumbnail, ...images] : [thumbnail];

  const settings = {
    dots: carouselImages.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
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
