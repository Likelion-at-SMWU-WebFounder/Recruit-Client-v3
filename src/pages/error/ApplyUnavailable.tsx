import ErrorLayout from './components/ErrorLayout';
import { ERROR_MESSAGES } from './constants';

const ResultUnavailable = () => {
  return (
    <ErrorLayout title={ERROR_MESSAGES.APPLY_UNAVAILABLE.TITLE}>
      {ERROR_MESSAGES.APPLY_UNAVAILABLE.APPLICATION_PERIOD}
    </ErrorLayout>
  );
};

export default ResultUnavailable;
