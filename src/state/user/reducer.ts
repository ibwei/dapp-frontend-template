import { createReducer } from '@reduxjs/toolkit'
import {
  UserGasPreferences,
  UserTheme,
  updateUserGasPreferences,
  updateUserTheme,
  updateUserLanguage,
  UserLanguage,
  updateUserTradeToken,
  updateUserSlippage,
} from './actions'

export interface UserState {
  userGasPreferences: UserGasPreferences
  userTheme: UserTheme
  userLanguage: UserLanguage
  userTradeToken: string
  userLpSlippage: number //  30/10000
}

export const initialState: UserState = {
  userGasPreferences: UserGasPreferences.NORMAL,
  userTheme: UserTheme.DARK,
  userLanguage: UserLanguage.EN,
  userTradeToken: 'BTC',
  userLpSlippage: 30,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserGasPreferences, (state, { payload: { userGasPreferences } }) => {
      state.userGasPreferences = userGasPreferences
    })
    .addCase(updateUserTheme, (state, { payload: { userTheme } }) => {
      state.userTheme = userTheme
    })
    .addCase(updateUserLanguage, (state, { payload: { userLanguage } }) => {
      state.userLanguage = userLanguage
    })
    .addCase(updateUserTradeToken, (state, { payload: { userTradeToken } }) => {
      state.userTradeToken = userTradeToken
    })
    .addCase(updateUserSlippage, (state, { payload: { userSlidppage } }) => {
      state.userLpSlippage = userSlidppage
    })
)
