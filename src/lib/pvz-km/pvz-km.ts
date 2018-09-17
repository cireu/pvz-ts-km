import * as tasFn from '../tas-func'
import { TEXT } from '../../util'
import { DModel as M, FModel, DTypes as W } from 'win32-api'
import * as ref from 'ref'

const tasFns = tasFn.load()

export class PVZKeyMacro {
  private static singleton: PVZKeyMacro
  private scene: SCENE
  private hwnd: M.HWND; private pid?: number; private handle?: M.HANDLE
  private constructor (gameName = 'Plants vs. Zombies', scene = SCENE.PE, hideBorder = false) {
    const PROCESS_ALL_ACCESS = (0x00100000 | 0x000F0000 | 0xFFF)

    this.scene = scene
    
    //Find Game
    let classNamePtr = TEXT('MainWindow'), gameNamePtr = TEXT(gameName)
    this.hwnd = tasFns.FindWindowW(classNamePtr, gameNamePtr)
    let pidPtr = ref.alloc(W.LPDWORD) as FModel.FFIBuffer
    if (this.hwnd) tasFns.GetWindowThreadProcessId(this.hwnd, pidPtr)
    // this.pid = pidPtr.deref()
    // if (this.pid !== 0) this.handle = tasFns.OpenProcess(PROCESS_ALL_ACCESS, 0, this.pid)
    // console.log(`Successfully found game PID:${this.pid}`)
    
    //HideBorder
    if (hideBorder) {
      let windowStyle = tasFns.GetWindowLongPtrW(this.hwnd, -16)
      windowStyle &= (
        ~tasFn.constants.WS_CAPTION &
        ~tasFn.constants.WS_THICKFRAME )
      tasFns.SetWindowLongPtrW(this.hwnd, -16, windowStyle)
      //
      tasFns.SetWindowPos(this.hwnd, ref.NULL, 0, 0, 640, 480, (0x0002 | 0x0200 | 0x0020))
    }
  }

  static initialize (gameName?: string, scene?: SCENE, hideBorder?: boolean) {
    PVZKeyMacro.singleton = PVZKeyMacro.singleton || new PVZKeyMacro(gameName, scene, hideBorder)
    return PVZKeyMacro.singleton
  }

  private leftClickAt (x: number, y: number) {
    
  }
}

export enum SCENE {
  DE = 'DE',
  NE = 'NE',
  ME = 'ME',
  PE = 'PE',
  FE = 'FE',
  RE = 'RE'
}