import React, { useEffect } from 'react'
import { useAppDispatch } from 'state'
import { updateDeviceInfo } from 'state/app/actions'
import { useIsMobile, useIsPC, useIsTablet } from 'state/app/hooks'

export function useResponsive() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isPC = useIsPC()
  return { isMobile, isTablet, isPC }
}

export function useAppResponsive() {
  const MobileWidth = 768
  const TabletWidth = 1200
  const dispatch = useAppDispatch()
  const calc = React.useCallback(() => {
    if (!window) return
    const width = document.body.clientWidth ?? document.documentElement.clientWidth
    if (width <= MobileWidth) {
      dispatch(updateDeviceInfo({ deviceInfo: { device: { isMobile: true, isTablet: false, isPC: false } } }))
    } else if (width > MobileWidth && width <= TabletWidth) {
      dispatch(updateDeviceInfo({ deviceInfo: { device: { isMobile: false, isTablet: true, isPC: false } } }))
    } else {
      dispatch(updateDeviceInfo({ deviceInfo: { device: { isMobile: false, isTablet: false, isPC: true } } }))
    }
  }, [dispatch])
  useEffect(() => {
    calc()
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('resize', calc)
    }
  }, [calc])
}
