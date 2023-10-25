import { toast, ToastContent, ToastOptions } from 'react-toastify'
import store from 'state'

export const helperToast = {
  success: (content: ToastContent, opts?: ToastOptions) => {
    const userThemeMode = store.getState().user.userTheme
    toast.success(content, { theme: userThemeMode, autoClose: 8000, ...opts })
  },
  error: (content: ToastContent, opts?: ToastOptions) => {
    const userThemeMode = store.getState().user.userTheme
    toast.error(content, { theme: userThemeMode, autoClose: 8000, ...opts })
  },
  info: (content: ToastContent, opts?: ToastOptions) => {
    const userThemeMode = store.getState().user.userTheme
    toast.info(content, { theme: userThemeMode, autoClose: 8000, ...opts })
  },
  clear: () => {
    toast.dismiss()
  },
}
