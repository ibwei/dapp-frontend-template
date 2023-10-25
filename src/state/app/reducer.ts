import { createReducer } from '@reduxjs/toolkit'
import { updateDeviceInfo } from './actions'

export interface DeviceInfo {
  device: {
    isMobile: boolean
    isTablet: boolean
    isPC: boolean
  }
}

export const initialState: DeviceInfo = {
  device: {
    isMobile: false,
    isTablet: false,
    isPC: true,
  },
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateDeviceInfo, (state, { payload: { deviceInfo } }) => {
    state.device.isMobile = deviceInfo.device.isMobile
    state.device.isTablet = deviceInfo.device.isTablet
    state.device.isPC = deviceInfo.device.isPC
  })
)
