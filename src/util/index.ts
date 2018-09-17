import { FModel } from 'win32-api'
export const TEXT = (text: string) => Buffer.from(text += text.endsWith('\0') ? '' : '\0', 'ucs-2') as FModel.FFIBuffer

