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
  updateUserH5TradingViewExpand,
  updateUserH5TradingViewPeriod,
} from './actions'
import { CHART_PERIODS_KEYS } from 'components/TVChartContainer/TVChartContainer'

export interface UserState {
  userGasPreferences: UserGasPreferences
  userTheme: UserTheme
  userLanguage: UserLanguage
  userTradeToken: string
  userLpSlippage: number //  30/10000
  userH5TradingViewExpand: boolean
  userH5TradingViewPeriod: CHART_PERIODS_KEYS
}

export const initialState: UserState = {
  userGasPreferences: UserGasPreferences.NORMAL,
  userTheme: UserTheme.DARK,
  userLanguage: UserLanguage.EN,
  userTradeToken: 'BTC',
  userLpSlippage: 30,
  userH5TradingViewExpand: false,
  userH5TradingViewPeriod: '5m',
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
    .addCase(updateUserH5TradingViewExpand, (state, { payload }) => {
      state.userH5TradingViewExpand = payload
    })
    .addCase(updateUserH5TradingViewPeriod, (state, { payload }) => {
      state.userH5TradingViewPeriod = payload
    })
)
