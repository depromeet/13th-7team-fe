import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 서버에서 정해진 format이 있으면 수정해서 사용하면 됩니다
export type CustomResponseFormat<T = any> = T;

export interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
  };
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>;
}

export interface ErrorResponseType {
  status: number;
  message: string;
}

export interface BaseResponseType<T> extends AxiosResponse<T> {
  status: number;
  data: T;
  message: string;
}

export type FetchResponseType<T> = {
  success: boolean;
  status: number;
  data?: T;
};
