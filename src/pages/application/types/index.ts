export interface ApplicantInfo {
  name: string;
  studentId: string;
  major: string;
  semestersLeft: string;
  phone: string;
  verificationCode: string; // 재/휴학여부 저장용으로 사용
  graduationYear: string; // 졸업 예정 연도
  email: string;
}

export type PartType = 'plan-design' | 'frontend' | 'backend';

export interface InterviewTime {
  date: string;
  times: string[];
}

export interface ApplicationFormData {
  applicantInfo: ApplicantInfo;
  part: PartType | null;
  programmersCompleted: boolean;
  answers: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
    q7: string;
    q8: string;
  };
  interviewSchedule: { [date: string]: string[] };
  agreements: {
    activityParticipation: boolean;
    photoUsage: boolean;
    eventParticipation: boolean;
  };
  password: string;
  passwordConfirm: string; // passwordConfirm은 여기 있으므로 ApplicantInfo에서 접근 불가
}

export interface Question {
  id: string;
  number: number;
  question: string;
  placeholder?: string;
  maxLength?: number;
}

export interface InterviewScheduleOption {
  date: string;
  dayOfWeek: string;
  times: string[];
}
