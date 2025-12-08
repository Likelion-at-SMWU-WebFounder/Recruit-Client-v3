const WebFoundersCardOverlay = () => {
  return (
    <>
      {/* 블러 레이어 */}
      <div
        className="absolute inset-0 rounded-b-[0.75rem] md:rounded-[1.38613rem] lg:rounded-[1.5625rem]"
        style={{
          backdropFilter: 'blur(48px)',
          WebkitBackdropFilter: 'blur(48px)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0 rounded-b-[0.75rem] md:rounded-[1.38613rem] lg:rounded-[1.5625rem]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </>
  );
};

export default WebFoundersCardOverlay;
