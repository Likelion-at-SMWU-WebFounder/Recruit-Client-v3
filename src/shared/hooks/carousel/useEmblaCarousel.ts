import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const useCarousel = () => {
  // embla carousel 설정
  // { loop: true } 마지막 다음에 처음으로 이어지게 설정
  // [Autoplay({ delay: 3000 })] 3초마다 자동 슬라이드 설정
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  // 화면에 표시 중인 캐러셀 인덱스
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 선택된 인덱스 설정 함수
  // emblaApi가 존재하지 않으면 함수 실행 안함
  // setSelectedIndex(emblaApi.selectedScrollSnap()) 화면에 표시 중인 인덱스 설정
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // 선택된 인덱스 설정 함수 실행
  // emblaApi가 존재하지 않으면 함수 실행 안함
  // emblaApi.on('select', onSelect) emblaApi가 변경될 때마다 onSelect 호출
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  // 인덱스로 스크롤 이동 함수 (버튼/도트 클릭 등으로 원하는 인덱스로 이동)
  // emblaApi.scrollTo(index) 인덱스로 스크롤 이동
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return {
    emblaRef,
    selectedIndex,
    scrollTo,
  };
};
