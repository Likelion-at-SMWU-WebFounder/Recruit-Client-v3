// 서류
export interface DocsResultRequest {
  name: string;
  password: string;
  studentId: string;
}

export type DocsStatus = 'PASS' | 'REJECT';

export interface DocsResultResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    name: string;
    docs: DocsStatus;
    interviewTime: string;
  };
}

// 최종 (서류와 같은 부분이 있긴 하지만 변경 가능성을 고려하여 우선 따로 구분)
export interface InterviewResultRequest {
  name: string;
  password: string;
  studentId: string;
}

export type InterviewStatus = 'PASS' | 'REJECT';

export type TrackCode = 'pm' | 'fe' | 'be';

export interface InterviewResultResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    name: string;
    interview: InterviewStatus;
    track: TrackCode;
  };
}
