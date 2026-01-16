import { useState } from 'react';
import type { ApplicationFormData, ApplicantInfo, PartType } from '../types/index';

const initialFormData: ApplicationFormData = {
  applicantInfo: {
    name: '',
    studentId: '',
    major: '',
    semestersLeft: '',
    phone: '',
    verificationCode: '',
    email: '',
  },
  part: null,
  programmersCompleted: false,
  answers: {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
  },
  interviewSchedule: {},
  agreements: {
    infoCollection: false,
    photoUsage: false,
    eventParticipation: false,
  },
  password: '',
  passwordConfirm: '',
};

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  // 지원자 정보 업데이트
  const updateApplicantInfo = (field: keyof ApplicantInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      applicantInfo: {
        ...prev.applicantInfo,
        [field]: value,
      },
    }));
  };

  // 지원 파트 업데이트
  const updatePart = (part: PartType) => {
    setFormData((prev) => ({
      ...prev,
      part,
    }));
  };

  // 프로그래머스 완료 여부 업데이트
  const updateProgrammersCompleted = (completed: boolean) => {
    setFormData((prev) => ({
      ...prev,
      programmersCompleted: completed,
    }));
  };

  // 질문 답변 업데이트
  const updateAnswer = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  // 면접 일정 업데이트
  const updateInterviewSchedule = (date: string, time: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTimes = prev.interviewSchedule[date] || [];
      const newTimes = checked ? [...currentTimes, time] : currentTimes.filter((t) => t !== time);

      return {
        ...prev,
        interviewSchedule: {
          ...prev.interviewSchedule,
          [date]: newTimes,
        },
      };
    });
  };

  // 동의 항목 업데이트
  const updateAgreement = (field: keyof ApplicationFormData['agreements'], checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreements: {
        ...prev.agreements,
        [field]: checked,
      },
    }));
  };

  // 비밀번호 업데이트
  const updatePassword = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
  };

  // 비밀번호 확인 업데이트
  const updatePasswordConfirm = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      passwordConfirm: value,
    }));
  };

  // 폼 제출
  const submitForm = () => {
    console.log('Form submitted:', formData);
    // API 호출 로직 추가
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updateApplicantInfo,
    updatePart,
    updateProgrammersCompleted,
    updateAnswer,
    updateInterviewSchedule,
    updateAgreement,
    updatePassword,
    updatePasswordConfirm,
    submitForm,
    resetForm,
  };
};
