import { Request } from 'express';

export interface ExtendedRequest extends Request {
  file_name: string;
}