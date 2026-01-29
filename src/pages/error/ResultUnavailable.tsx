import ErrorLayout from './components/ErrorLayout';
import { ERROR_MESSAGES } from './constants';

const ResultUnavailable = () => {
  return (
    <ErrorLayout
      title={ERROR_MESSAGES.RESULT_UNAVAILABLE.TITLE}
      description={
        <>
          {ERROR_MESSAGES.RESULT_UNAVAILABLE.DOCUMENT_PERIOD}
          <br />
          {ERROR_MESSAGES.RESULT_UNAVAILABLE.FINAL_RESULT_PERIOD}
        </>
      }
    />
  );
};

export default ResultUnavailable;
