import axios from 'axios';
import type { ApplicationRequest } from '../types/api';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getTrackQuery = (track: ApplicationRequest['studentInfo']['track']) => {
  const map: Record<ApplicationRequest['studentInfo']['track'], 'pm' | 'fe' | 'be'> = {
    PLANDESIGN: 'pm',
    FRONTEND: 'fe',
    BACKEND: 'be',
  };
  return map[track];
};

export const postApplication = async (request: ApplicationRequest, file?: File) => {
  const form = new FormData();

  // request: Text(application/json)
  form.append('request', JSON.stringify(request));

  // programmersFile: File(.zip) optional
  if (file) form.append('programmersFile', file);

  const track = getTrackQuery(request.studentInfo.track);

  const res = await axios.post(`${BASE_URL}/api/recruit/docs?track=${track}`, form);

  return res.data;
};
