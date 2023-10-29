import { createAction } from '@reduxjs/toolkit'

export enum UserGasPreferences {
  FAST = 'fast',
  NORMAL = 'normal',
  SLOW = 'slow',
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum UserLanguage {
  EN = 'en',
  ZH = 'zh_CN',
}

export const updateUserGasPreferences = createAction<{ userGasPreferences: UserGasPreferences }>('user/updateUserGasPreferences')
export const updateUserTheme = createAction<{ userTheme: UserTheme }>('user/updateUserTheme')
export const updateUserLanguage = createAction<{ userLanguage: UserLanguage }>('user/updateUserLanguage')
export const updateUserTradeToken = createAction<{ userTradeToken: string }>('user/updateUserTradeToken')
export const updateUserSlippage = createAction<{ userSlidppage: number }>('user/updateUserSlippage')
export const updateUserH5TradingViewExpand = createAction<boolean>('user/updateUserH5TradingViewExpand')
