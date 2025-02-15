import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { solicitacaoReducer } from './solicitacao';

export const store = configureStore({
  reducer: {
    solicitacao: solicitacaoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
