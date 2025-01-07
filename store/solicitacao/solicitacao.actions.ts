import { createAction } from "@reduxjs/toolkit";
import { Solicitacao } from "types";

export enum SolicitacaoActions {
  DECODIFICA_QRCODE = "Cria solicitação a partir da leitura de um QR Code",
  ADICIONA_ARQUIVOS = "Adiciona arquivos capturados à uma solicitação",
  CANCELA = "Cancela solicitação de captura de documentos",
  FINALIZA = "Envia documentos capturados da solicitação",
  ERRO = "Erro ao enviar arquivo ao ECM",
}

export const decodificaQrcode = createAction<Solicitacao>(
  SolicitacaoActions.DECODIFICA_QRCODE
);

export const adicionaArquivos = createAction<{
  id: number;
  capturas: File[];
}>(SolicitacaoActions.ADICIONA_ARQUIVOS);

export const cancelaSolicitacao = createAction(SolicitacaoActions.CANCELA);

export const finalizaSolicitacao = createAction(SolicitacaoActions.FINALIZA);

export const erroSolicitacao = createAction<string>(SolicitacaoActions.ERRO);
