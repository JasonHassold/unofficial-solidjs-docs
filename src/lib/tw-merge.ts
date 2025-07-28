import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export const cn = (...inputs: Parameters<typeof twMerge>) => {
  return twMerge(clsx(inputs))
}
