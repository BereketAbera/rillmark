import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Consumer-owned class composition; caller utilities override defaults. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
