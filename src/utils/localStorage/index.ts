import { useLocalStorage } from 'react-use'
import { useCallback } from 'react'

export function useLocalStorageByChainId<T>(chainId: any, key: string, defaultValue: T): [T | string, (value: T) => void] {
  const [internalValue, setInternalValue] = useLocalStorage(key, {}) as any

  const setValue = useCallback(
    (value: any) => {
      setInternalValue((internalValue: { [x: string]: any }) => {
        if (typeof value === 'function') {
          value = value(internalValue?.[chainId] || defaultValue)
        }

        const newInternalValue = {
          ...internalValue,
          [chainId]: value,
        }
        return newInternalValue
      })
    },
    [chainId, setInternalValue, defaultValue]
  )

  let value

  if (internalValue && chainId in internalValue) {
    value = internalValue[chainId]
  } else {
    value = defaultValue
  }

  return [value, setValue]
}

export function useLocalStorageSerializeKey<T>(
  key: string | any[],
  value: T,
  opts?: {
    raw: boolean
    serializer: (val: T) => string
    deserializer: (value: string) => T
  }
) {
  key = JSON.stringify(key)

  return useLocalStorage<T>(key, value, opts)
}
