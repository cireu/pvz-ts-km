import { FModel,U } from 'win32-api'
import { tasApiDef, TasWin32Fns } from './tas-win32fn-def'
import { load as hload } from './helper'

export const load = (
  fns?: FModel.FnName[],
  settings?: FModel.LoadSettings ) => {
    let ret = {} as TasWin32Fns;
    [...tasApiDef].forEach(([ dllName, dllFuncs ]) => 
      Object.assign(ret, hload<TasWin32Fns>(dllName, dllFuncs, fns, settings))
    )
    return ret
  }

export const { constants } = U



