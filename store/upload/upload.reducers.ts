import { UploadActions } from './upload.actions';

export type UploadState = {
  selectedFiles: Blob[];
  filesToUpload: Blob[];
  exibeModal: boolean;
};

export const uploadInitial: UploadState = {
  selectedFiles: [],
  filesToUpload: [],
  exibeModal: false,
};

export const uploadReducer = (state: UploadState, action: any) => {
  switch (action.type) {
    case UploadActions.INICIA:
      return { ...state, exibeModal: true };
    case UploadActions.CANCELA:
      return { ...state, exibeModal: false };
    case UploadActions.SELECIONA: {
      return {
        ...state,
        selectedFiles: action.selectedFiles,
      };
    }
    case UploadActions.UPLOAD: {
      return {
        ...state,
        filesToUpload: state.selectedFiles,
        selectedFiles: [],
        exibeModal: false,
      };
    }
    case UploadActions.FINALIZA:
      return uploadInitial;
    default:
      return state;
  }
};
