import axios, { AxiosPromise } from 'axios';

export const inclui = (apiUrl: string, data: any): AxiosPromise =>
  axios.post(`${apiUrl}/web/arquivos`, data);

export const consulta = (apiUrl: string, id: string): AxiosPromise => {
  return axios.get(`${apiUrl}/web/solicitacoes/${id}`);
};
