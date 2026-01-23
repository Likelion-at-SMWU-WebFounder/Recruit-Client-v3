// 1. 지원자 기본 정보
export interface ApplicantInfo {
  name: string;
  studentId: string;
  major: string;
  semestersLeft: string;
  phone: string;
  verificationCode: string;
  graduationYear: string;
  email: string;
}

// 2. 입력 필드 설정
export interface FieldConfig {
  id: keyof ApplicantInfo;
  label: string;
  placeholder?: string;
  required: boolean;
  subText?: string;
  options?: { label: string; value: string }[];
}

// 3. 지원 파트 타입
export type PartType = 'plan-design' | 'frontend' | 'backend';

// 4. 질문 정보
export interface Question {
  id: string;
  number: number;
  question: string;
  placeholder?: string;
  maxLength?: number;
  type: 'long' | 'short' | 'special';
  required: boolean;
}

// 5. 면접 일정 관련
export interface InterviewScheduleOption {
  date: string;
  dayOfWeek: string;
  times: string[];
}

// 선택된 스케줄 데이터 타입
export type SelectedSchedule = {
  [date: string]: string[];
};

// 6. 전체 신청서 데이터 구조
export interface ApplicationFormData {
  applicantInfo: ApplicantInfo;
  part: PartType | null;
  programmersCompleted: boolean;
  answers: {
    [key: string]: string;
  };
  interviewSchedule: SelectedSchedule;
  agreements: {
    activityParticipation: boolean;
    photoUsage: boolean;
    eventParticipation: boolean;
  };

  // 비밀번호 관리
  password: string;
  passwordConfirm: string;
}
