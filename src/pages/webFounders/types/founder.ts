// 웹파운더즈 멤버 데이터 타입 정의
export interface FounderType {
  id: number;
  name: string;
  no: string;
  part: string;
  image: string;
  responsibilities?: string;
  email?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  notion?: string;
}

// 파트별로 멤버를 그룹화한 타입
export interface FoundersByPartType {
  part: string;
  members: FounderType[];
}

// 웹파운더즈 기수별 필터 옵션 타입
export interface WebFoundersFilterOptionsType {
  id: number;
  name: string;
}
