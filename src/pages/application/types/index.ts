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

// 2. 입력 필드 설정 (상수용)
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

// 4. 질문 정보 (질문 상수에 맞춰 확장)
export interface Question {
  id: string;
  number: number;
  question: string;
  placeholder?: string;
  maxLength?: number;
  type: 'long' | 'short' | 'special'; // 질문 성격에 따른 타입 추가
  required: boolean; // 필수 여부 추가
}

// 5. 면접 일정 관련
export interface InterviewScheduleOption {
  date: string; // "2024-03-01"
  dayOfWeek: string; // "(금)"
  times: string[]; // ["10:00", "11:00", ...]
}

// 6. 전체 신청서 데이터 구조
export interface ApplicationFormData {
  applicantInfo: ApplicantInfo;
  part: PartType | null;
  programmersCompleted: boolean;

  // 답변 구조: q1, q2... 등 고정 키 대신 유연한 레코드 타입 권장
  answers: {
    [key: string]: string;
  };

  // 면접 선택 시간: { "2024-03-01": ["10:00", "14:00"] }
  interviewSchedule: {
    [date: string]: string[];
  };

  agreements: {
    activityParticipation: boolean;
    photoUsage: boolean;
    eventParticipation: boolean;
  };

  // 비밀번호 관리는 별도 필드로 유지
  password: string;
  passwordConfirm: string;
}
