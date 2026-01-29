import { useState, useCallback } from 'react';
import axios from 'axios';
import { postApplication } from '../apis/recruit';
import type { ApplicationRequest, TrackType, SchoolStatusType, ProgrammersStatusType } from '../types/api';
import type { ApplicationFormData, ApplicantInfo, PartType, AgreementKey } from '../types/index';

const MOCK_MODE = false;

const initialFormData: ApplicationFormData = {
  applicantInfo: {
    name: '',
    studentId: '',
    major: '',
    semestersLeft: '',
    phone: '',
    verificationCode: '재학',
    graduationYear: '',
    email: '',
  },
  part: 'plan-design',
  programmersCompleted: false,
  answers: { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' },
  interviewSchedule: {},
  agreements: { activityParticipation: false, photoUsage: false, eventParticipation: false },
  password: '',
  passwordConfirm: '',
};

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const resetForm = useCallback(() => setFormData(initialFormData), []);

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

  /* UI 폼 -> 서버 DTO 변환  */
  const transformDataForServer = useCallback((): ApplicationRequest => {
    const { applicantInfo, part, answers, interviewSchedule, agreements, password, programmersCompleted } = formData;

    if (!part) {
      throw new Error('지원 파트(part)가 선택되지 않았습니다.');
    }

    // interview_time
    const interview_time: Record<string, string> = {};
    let timeIdx = 1;
    Object.entries(interviewSchedule).forEach(([date, times]) => {
      times.forEach((time) => {
        interview_time[String(timeIdx++)] = `${date} ${time}`;
      });
    });

    // q1 -> a1
    const answerList: Record<string, string> = {};
    Object.entries(answers).forEach(([key, value]) => {
      answerList[key.replace('q', 'a')] = value;
    });

    // 재/휴학 상태
    const schoolStatusMapping: Record<string, SchoolStatusType> = {
      재학: 'ENROLLED',
      휴학: 'ON_LEAVE',
      '졸업 유예': 'DEFERRED_GRADUATION',
    };

    const track = (part === 'plan-design' ? 'PLANDESIGN' : part.toUpperCase()) as TrackType;

    return {
      studentInfo: {
        name: applicantInfo.name,
        track,
        phoneNumber: applicantInfo.phone,
        email: applicantInfo.email,
        studentId: applicantInfo.studentId,
        major: applicantInfo.major,
        completedSem: Number(applicantInfo.semestersLeft),
        schoolStatus: schoolStatusMapping[applicantInfo.verificationCode] || 'ENROLLED',
        programmers: (programmersCompleted ? 'ENROLLED' : 'NOT_ENROLLED') as ProgrammersStatusType,
        programmersImg: '',
        password,
        graduatedYear: applicantInfo.graduationYear,
        agreeToTerms: agreements.activityParticipation,
        agreeToEventParticipation: agreements.eventParticipation,
        portfolio: answers.q7 || '',
      },
      interview_time,
      answerListRequest: answerList,
      answerList,
    };
  }, [formData]);

  /* 최종 제출 (file은 여기로만 전달) */
  const submitForm = useCallback(
    async (file?: File) => {
      if (submitStatus === 'loading') return false;
      setSubmitStatus('loading');

      if (MOCK_MODE) {
        await new Promise((r) => setTimeout(r, 1500));
        setSubmitStatus('success');
        return true;
      }

      try {
        const request = transformDataForServer();
        if (import.meta.env.DEV) {
          console.group('[Application Submit] request payload');
          console.log(request);
          console.log('[file]', file ? { name: file.name, size: file.size, type: file.type } : 'none');
          console.groupEnd();
        }
        await postApplication(request, file);

        setSubmitStatus('success');
        resetForm();
        return true;
      } catch (error: unknown) {
        // 백엔드: 중복이면 409
        const isDuplicate =
          axios.isAxiosError(error) && (error.response?.status === 409 || error.response?.data?.code === 409);

        setSubmitStatus(isDuplicate ? 'duplicate' : 'error');
        console.error('제출 실패:', error);
        return false;
      }
    },
    [submitStatus, transformDataForServer, resetForm]
  );

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
