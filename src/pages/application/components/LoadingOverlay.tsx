import '../styles/loading.css';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message = '서류를 제출 중입니다...' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
      <div className="loader">
        <div className="load-inner load-one"></div>
        <div className="load-inner load-two"></div>
        <div className="load-inner load-three"></div>
        <span className="loader-text z-10 text-[1.375rem] leading-[120%] font-bold whitespace-nowrap text-white md:text-[2.375rem] lg:text-[2.625rem]">
          {message}
        </span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
