import { createAction } from '@reduxjs/toolkit'
import { DeviceInfo } from './reducer'

export const updateDeviceInfo = createAction<{ deviceInfo: DeviceInfo }>('app/updateDeviceInfo')
