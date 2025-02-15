import { createReducer } from '@reduxjs/toolkit';
import { Solicitacao } from 'types';
import {
  adicionaArquivos,
  cancelaSolicitacao,
  decodificaQrcode,
  erroSolicitacao,
  finalizaSolicitacao,
} from './solicitacao.actions';

export type SolicitacaoState = {
  dados: Solicitacao;
  enviada: boolean;
  erro?: string;
};

export const initialState: SolicitacaoState = {
  dados: {
    id: '',
    dataHoraExpiracao: '',
    organizacao: '',
    sistema: '',
    arquivos: [],
    dataHoraAtualizacao: '',
    dataHoraCriacao: '',
    usuarioCriacao: '',
    usuarioAtualizacao: ''
  },
  enviada: false,
};

export const solicitacaoReducer = createReducer(initialState, (builder) => {
  builder.addCase(decodificaQrcode, (state, { payload }) => {
    if (state.dados.id === '') {
      state.dados = payload;
    }
  });

  builder.addCase(adicionaArquivos, (state, { payload }) => {
    const modificados = state.dados.arquivos.map((arquivo) => {
      if (arquivo.id === payload.id) {
        if (!arquivo.form) {
          arquivo.form = new FormData();
        }
        payload.capturas.forEach((captura) => {
          arquivo.form?.append('arquivos', captura, captura.name);
        });
      }
      return arquivo;
    });
    state.dados = {
      ...state.dados,
      arquivos: modificados,
    };
  });

  builder.addCase(cancelaSolicitacao, (state, action) => {
    state.dados = initialState.dados;
    state.enviada = initialState.enviada;
    state.erro = initialState.erro;
  });

  builder.addCase(finalizaSolicitacao, (state, action) => {
    state.enviada = true;
  });

  builder.addCase(erroSolicitacao, (state, { payload }) => {
    state.erro = payload;
    state.enviada = true;
  });
});
