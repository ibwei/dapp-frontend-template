import { useSelector } from 'react-redux'
import { AppState } from '../index'

// Get user useIsMobile
export function useIsMobile() {
  return useSelector<AppState, AppState['app']['device']['isMobile']>((state) => state.app.device.isMobile)
}

// Get user useIsTablet
export function useIsTablet() {
  return useSelector<AppState, AppState['app']['device']['isTablet']>((state) => state.app.device.isTablet)
}

// Get user useIsPC
export function useIsPC() {
  return useSelector<AppState, AppState['app']['device']['isPC']>((state) => state.app.device.isPC)
}
