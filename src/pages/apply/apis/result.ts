import axios from 'axios';
import type {
  DocsResultRequest,
  DocsResultResponse,
  InterviewResultRequest,
  InterviewResultResponse,
} from '../types/result';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type ResultApiError = 'BAD_REQUEST' | 'NOT_FOUND' | 'SERVER_ERROR' | 'UNKNOWN';

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ResultApiError; status?: number };

export const postDocsResult = async (body: DocsResultRequest): Promise<ApiResult<DocsResultResponse>> => {
  try {
    const res = await axios.post<DocsResultResponse>(`${BASE_URL}/api/recruit/result/docs`, body);
    if (import.meta.env.DEV) {
      console.log('[Docs Result Success]:', res.data);
    }
    return { ok: true, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (import.meta.env.DEV) {
        console.error(`[Docs Result Error ${status}]:`, err.response?.data);
      }

      if (status === 400) return { ok: false, error: 'BAD_REQUEST', status };
      if (status === 404) return { ok: false, error: 'NOT_FOUND', status };
      if (status === 500) return { ok: false, error: 'SERVER_ERROR', status };
      return { ok: false, error: 'UNKNOWN', status };
    }
    return { ok: false, error: 'UNKNOWN' };
  }
};

export const postInterviewResult = async (
  body: InterviewResultRequest
): Promise<ApiResult<InterviewResultResponse>> => {
  try {
    const res = await axios.post<InterviewResultResponse>(`${BASE_URL}/api/recruit/result/interview`, body);
    if (import.meta.env.DEV) {
      console.log('[Interview Result Success]:', res.data);
    }
    return { ok: true, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (import.meta.env.DEV) {
        console.error(`[Interview Result Error ${status}]:`, err.response?.data);
      }
      if (status === 400) return { ok: false, error: 'BAD_REQUEST', status };
      if (status === 404) return { ok: false, error: 'NOT_FOUND', status };
      if (status === 500) return { ok: false, error: 'SERVER_ERROR', status };
      return { ok: false, error: 'UNKNOWN', status };
    }
    return { ok: false, error: 'UNKNOWN' };
  }
};
