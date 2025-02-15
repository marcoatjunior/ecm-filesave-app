import { DocumentoActions } from './documento.actions';

export type DocumentoState = {
  buffer?: ArrayBuffer;
  documento?: Uint8Array;
  exibeModal: boolean;
};

export const documentoInitial: DocumentoState = {
  exibeModal: false,
};

export const documentoReducer = (state: DocumentoState, action: any) => {
  switch (action.type) {
    case DocumentoActions.CARREGA:
      return { ...state, buffer: action.buffer };
    case DocumentoActions.ASSINA:
      return { ...state, documento: action.documento };
    case DocumentoActions.EXIBE:
      return { ...state, exibeModal: action.exibeModal };
    default:
      return state;
  }
};
