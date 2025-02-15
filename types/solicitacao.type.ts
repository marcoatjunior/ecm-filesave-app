import { Arquivo } from "./arquivo.type";

export type Solicitacao = {
  id: string;
  dataHoraExpiracao: string;
  organizacao: string;
  sistema: string;
  arquivos: Arquivo[];
  dataHoraAtualizacao: string;
  dataHoraCriacao: string;
  usuarioCriacao: string;
  usuarioAtualizacao: string;
};
