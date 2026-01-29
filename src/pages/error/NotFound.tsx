import ErrorLayout from './components/ErrorLayout';

const NotFound = () => {
  return (
    <ErrorLayout
      title="잘못된 접근입니다."
      renderDescription={({ lineBreakClassName }) => (
        <>
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          페이지의 주소가 변경 혹은 삭제되어 <br className={lineBreakClassName} /> 요청하신 페이지를 찾을 수 없습니다.
        </>
      )}
    />
  );
};

export default NotFound;
