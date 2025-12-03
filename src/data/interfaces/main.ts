import { Record } from './record';

export class TimeRecord {
  id?: string;
  children?: TimeRecord[];
  data?: Record;
  meta?: {
    timestamp?: number;
    label?: string;
    hesitation?: number;
  };
}

export class SaveTimeRecordRequest {
  id: string;
  payload: TimeRecord[];
}