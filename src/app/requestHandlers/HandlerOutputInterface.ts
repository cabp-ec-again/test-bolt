import { type RequestErrorJsonInterface } from '~/app/errors/RequestError';

export interface SuccessfulOperationInterface {
  success: boolean;
  message?: string;
}

export interface HandlerOutputInterface<T> {
  status: number;
  data: T | SuccessfulOperationInterface | null;
  errors?: RequestErrorJsonInterface | RequestErrorJsonInterface[];
}
