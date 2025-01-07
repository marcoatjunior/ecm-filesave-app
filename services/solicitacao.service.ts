import axios, { AxiosPromise } from 'axios';

export const inclui = (url: string, data: any): AxiosPromise =>
  axios.post(url, data);

export const consulta = (apiUrl: string, id: number): AxiosPromise => {
  return axios.get(`${apiUrl}/web/solicitacoes/${id}`);
};
