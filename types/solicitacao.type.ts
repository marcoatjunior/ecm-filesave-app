import { Arquivo } from "./arquivo.type";

export type Solicitacao = {
  id: number;
  dataHoraExpiracao: string;
  token: string;
  url: string;
  arquivos: Arquivo[];
};
