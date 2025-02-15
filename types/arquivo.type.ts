import { Informacao } from "./informacao.type";

export type Arquivo = {
  id: number;
  nome: string;
  tipo: string;
  informacoes: Informacao;
  form?: FormData;
  dataHoraAtualizacao: string;
  dataHoraCriacao: string;
  usuarioCriacao: string;
  usuarioAtualizacao: string;
};
