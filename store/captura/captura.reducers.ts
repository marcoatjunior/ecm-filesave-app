import { CapturaActions } from './captura.actions';

export type CapturaState = {
  capturas: Blob[];
  previa: Blob;
  exibeModal: boolean;
};

export const capturaInitial: CapturaState = {
  capturas: [],
  previa: null as unknown as Blob,
  exibeModal: false,
};

export const capturaReducer = (state: CapturaState, action: any) => {
  switch (action.type) {
    case CapturaActions.INICIA:
      return { ...state, previa: null, exibeModal: true };
    case CapturaActions.CANCELA:
      return { ...state, previa: null, exibeModal: false };
    case CapturaActions.CAPTURA:
      return {
        ...state,
        previa: action.previa,
      };
    case CapturaActions.APROVA:
      return {
        ...state,
        capturas: state.capturas.concat(state.previa),
        previa: null,
        exibeModal: false,
      };
    case CapturaActions.REJEITA:
      return { ...state, previa: null };
    case CapturaActions.FINALIZA:
      return capturaInitial;
    default:
      return state;
  }
};
