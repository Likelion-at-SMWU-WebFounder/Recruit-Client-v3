// 지원자 정보 타입
export interface ApplicantInfo {
  name: string;
  studentId: string;
  major: string;
  semestersLeft: string;
  phone: string;
  verificationCode: string;
  email: string;
}

// 지원 파트 타입
export type PartType = 'plan-design' | 'frontend' | 'backend';

// 면접 시간 타입
export interface InterviewTime {
  date: string;
  times: string[];
}

// 폼 데이터 전체 타입
export interface ApplicationFormData {
  // 지원자 정보
  applicantInfo: ApplicantInfo;

  // 지원 파트
  part: PartType | null;
  programmersCompleted: boolean;

  // 질문 답변 (1~8번)
  answers: {
    q1: string; // 지원 동기
    q2: string; // 본인 성향
    q3: string; // 멋사 활동 후 계획
    q4: string; // 경험 유무
    q5: string; // 협업 갈등 경험
    q6: string; // 멋사 지원 이유
    q7: string; // 사용 가능 기술
    q8: string; // 면접 가능 일정
  };

  // 면접 가능 시간
  interviewSchedule: {
    [date: string]: string[];
  };

  // 동의 항목
  agreements: {
    infoCollection: boolean;
    photoUsage: boolean;
    eventParticipation: boolean;
  };

  // 비밀번호
  password: string;
  passwordConfirm: string;
}

// 질문 타입
export interface Question {
  id: string;
  number: number;
  question: string;
  placeholder?: string;
  maxLength?: number;
}

// 면접 일정 타입
export interface InterviewScheduleOption {
  date: string;
  dayOfWeek: string;
  times: string[];
}
