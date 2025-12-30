// 모집 파트 타입
export interface RecruitPartTypes {
  id: string;
  title: string;
  skills: string;
  description: string;
  cta: string;
}

// 모집 안내 탭 타입
export interface RecruitInfoTabTypes {
  id: string;
  label: string;
}

// 지원 자격 항목 타입
export interface QualificationTypes {
  id: string;
  content: string;
}

// 활동 안내 항목 타입
export interface ActivityTypes {
  id: string;
  content: string;
}

// 서류 가산점 항목 타입
export interface BonusPointTypes {
  id: string;
  content: string;
}

// 수료 조건 타입
export interface CompletionConditionTypes {
  id: string;
  title: string;
  items: {
    id: string;
    number: string;
    title: string;
    description?: string;
  }[];
}

// 모집 일정 타입
export interface ScheduleTypes {
  id: string;
  dateRange: string;
  label: string;
  status: 'upcoming' | 'current' | 'completed';
}

// FAQ 항목 타입
export interface FAQTypes {
  id: string;
  question: string;
  answer: string;
}
