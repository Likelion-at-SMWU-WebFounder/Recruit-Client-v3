import { useState, useCallback } from 'react';
import type { ApplicationFormData, ApplicantInfo, PartType, AgreementKey } from '../types/index';

const initialFormData: ApplicationFormData = {
  applicantInfo: {
    name: '',
    studentId: '',
    major: '',
    semestersLeft: '',
    graduationYear: '',
    phone: '',
    verificationCode: '',
    email: '',
  },
  part: null,
  programmersCompleted: false,
  answers: { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' },
  interviewSchedule: {},
  agreements: { activityParticipation: false, photoUsage: false, eventParticipation: false },
  password: '',
  passwordConfirm: '',
};

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const updateApplicantInfo = useCallback((field: keyof ApplicantInfo, value: string) => {
    setFormData((prev) => ({ ...prev, applicantInfo: { ...prev.applicantInfo, [field]: value } }));
  }, []);

  const updatePart = useCallback((part: PartType) => {
    setFormData((prev) => ({ ...prev, part }));
  }, []);

  const updateProgrammersCompleted = useCallback((completed: boolean) => {
    setFormData((prev) => ({ ...prev, programmersCompleted: completed }));
  }, []);

  const updateAnswer = useCallback((questionId: string, value: string) => {
    setFormData((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: value } }));
  }, []);

  const updateInterviewSchedule = useCallback((date: string, time: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTimes = prev.interviewSchedule[date] || [];
      const newTimes = checked ? [...currentTimes, time] : currentTimes.filter((t) => t !== time);
      const newSchedule = { ...prev.interviewSchedule };
      if (newTimes.length > 0) newSchedule[date] = newTimes;
      else delete newSchedule[date];
      return { ...prev, interviewSchedule: newSchedule };
    });
  }, []);

  const updateAgreement = useCallback((field: AgreementKey, checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreements: { ...prev.agreements, [field]: checked } }));
  }, []);

  const updatePassword = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
  }, []);

  const updatePasswordConfirm = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, passwordConfirm: value }));
  }, []);

  const submitForm = useCallback(async () => {
    setSubmitStatus('loading');
    try {
      // API 전송 시뮬레이션
      console.log('Server Request:', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      return true;
    } catch (error) {
      console.log(error);
      setSubmitStatus('error');
      return false;
    }
  }, [formData]);

  const resetForm = useCallback(() => setFormData(initialFormData), []);

  return {
    formData,
    submitStatus,
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
