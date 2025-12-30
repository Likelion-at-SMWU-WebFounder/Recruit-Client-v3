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
