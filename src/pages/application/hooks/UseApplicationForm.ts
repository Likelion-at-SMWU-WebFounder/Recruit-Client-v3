import { useState, useCallback } from 'react';
//import axios, { AxiosError } from 'axios';
import type { ApplicationFormData, ApplicantInfo, PartType, AgreementKey } from '../types/index';

const MOCK_MODE = true;
const MOCK_RESULT = 'success' as 'success' | 'duplicate' | 'error';

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  /** 지원자 기본 정보 업데이트 */
  const updateApplicantInfo = useCallback((field: keyof ApplicantInfo, value: string) => {
    setFormData((prev) => ({ ...prev, applicantInfo: { ...prev.applicantInfo, [field]: value } }));
  }, []);

  /** 지원 파트 업데이트 */
  const updatePart = useCallback((part: PartType) => {
    setFormData((prev) => ({ ...prev, part }));
  }, []);

  /** 프로그래머스 수료 여부 업데이트 */
  const updateProgrammersCompleted = useCallback((completed: boolean) => {
    setFormData((prev) => ({ ...prev, programmersCompleted: completed }));
  }, []);

  /** 질문 답변 업데이트 (q1~q7) */
  const updateAnswer = useCallback((questionId: string, value: string) => {
    setFormData((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: value } }));
  }, []);

  /** 면접 일정 선택 업데이트 */
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

  /** 각종 동의 항목 업데이트 */
  const updateAgreement = useCallback((field: AgreementKey, checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreements: { ...prev.agreements, [field]: checked } }));
  }, []);

  const updatePassword = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
  }, []);

  const updatePasswordConfirm = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, passwordConfirm: value }));
  }, []);

  /** 서버 Request Body 형식으로 데이터 변환 */
  const transformDataForServer = useCallback(() => {
    const { applicantInfo, part, answers, interviewSchedule, agreements, password } = formData;

    // 1. 면접 시간 변환 (인덱스 키 기반)
    const interview_time: { [key: string]: string } = {};
    let timeIdx = 1;
    Object.entries(interviewSchedule).forEach(([date, times]) => {
      times.forEach((time) => {
        interview_time[String(timeIdx++)] = `${date} ${time}`;
      });
    });

    // 2. 답변 키 변환 (q1 -> a1)
    const answerList: { [key: string]: string } = {};
    Object.entries(answers).forEach(([key, value]) => {
      const newKey = key.replace('q', 'a');
      answerList[newKey] = value;
    });

    return {
      studentInfo: {
        name: applicantInfo.name,
        track: part?.toUpperCase(),
        phoneNumber: applicantInfo.phone,
        email: applicantInfo.email,
        studentId: applicantInfo.studentId,
        major: applicantInfo.major,
        completedSem: Number(applicantInfo.semestersLeft),
        schoolStatus: applicantInfo.verificationCode,
        programmers: formData.programmersCompleted ? 'ENROLLED' : 'NOT_ENROLLED',
        programmersImg: '',
        password: password,
        graduatedYear: applicantInfo.graduationYear,
        agreeToTerms: agreements.activityParticipation,
        agreeToEventParticipation: agreements.eventParticipation,
        portfolio: answers.q7,
      },
      interview_time,
      answerListRequest: answerList,
      answerList: answerList,
    };
  }, [formData]);

  /** 최종 제출 함수 */
  const submitForm = useCallback(async () => {
    setSubmitStatus('loading');
    //const requestBody = transformDataForServer(); // 데이터 변환

    // 1. 테스트 모드 로직
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (MOCK_RESULT === 'success') {
        setSubmitStatus('success');
        return true;
      } else if (MOCK_RESULT === 'duplicate') {
        setSubmitStatus('duplicate');
        return false;
      } else {
        setSubmitStatus('error');
        return false;
      }
    }

    // try {
    //   const { data } = await axios.post('/api/recruit/docs', requestBody);

    //   if (data.isSuccess && data.code === 404) {
    //     setSubmitStatus('duplicate');
    //     return false;
    //   }

    //   // 최종 성공 처리
    //   if (data.isSuccess) {
    //     setSubmitStatus('success');
    //     return true;
    //   }

    //   throw new Error(data.message || '제출 실패');
    // } catch (error) {
    //   const axiosError = error as AxiosError<{ message: string; code?: number }>;

    //   // 서버가 HTTP 에러 404를 반환할 경우
    //   if (axiosError.response?.status === 404 || axiosError.response?.data?.code === 404) {
    //     setSubmitStatus('duplicate');
    //   } else {
    //     setSubmitStatus('error');
    //   }
    //   return false;
    // }
  }, [transformDataForServer]);

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
