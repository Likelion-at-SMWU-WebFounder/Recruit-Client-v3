export type TrackType = 'PLANDESIGN' | 'FRONTEND' | 'BACKEND';
export type SchoolStatusType = 'ENROLLED' | 'ON_LEAVE' | 'DEFERRED_GRADUATION';
export type ProgrammersStatusType = 'ENROLLED' | 'NOT_ENROLLED';

export interface ApplicationRequest {
  studentInfo: {
    name: string;
    track: TrackType;
    phoneNumber: string;
    email: string;
    studentId: string;
    major: string;
    completedSem: number;
    schoolStatus: SchoolStatusType;
    programmers: ProgrammersStatusType;
    programmersImg?: string;
    password: string;
    graduatedYear: string;
    agreeToTerms: boolean;
    agreeToEventParticipation: boolean;
    portfolio?: string;
  };
  interview_time: Record<string, string>;
  answerListRequest: Record<string, string>;
  answerList: Record<string, string>;
}
