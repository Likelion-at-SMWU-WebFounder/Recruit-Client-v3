const BlurLayer = () => {
  return (
    <>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[9rem] w-[22.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[5rem] bg-white opacity-80 blur-md md:h-[18rem] md:w-[50rem] md:rounded-full md:blur-2xl"></div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[9rem] w-[22.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[5rem] bg-white opacity-90 blur-lg md:h-[18rem] md:w-[50rem] md:rounded-full md:blur-2xl"></div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[9rem] w-[22.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[5rem] opacity-90 blur-2xl [background:radial-gradient(circle,_rgba(247,250,255,1)_100%,_rgba(247,250,255,0.9)_70%)] md:h-[18rem] md:w-[50rem] md:rounded-full"></div>
    </>
  );
};

export default BlurLayer;
