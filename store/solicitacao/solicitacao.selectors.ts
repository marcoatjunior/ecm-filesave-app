import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { SolicitacaoState } from "./solicitacao.reducers";

export const selectSolicitacao = createSelector(
  (state: RootState) => state.solicitacao,
  (state: SolicitacaoState) => state
);
