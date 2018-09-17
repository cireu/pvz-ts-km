import * as tasFn from '../tas-func'
import { TEXT, xyPosToWparam } from '../../util'
import { DModel as M, FModel, DTypes as W } from 'win32-api'
import * as ref from 'ref'


const tasFns = tasFn.load()

export class PVZKeyMacro {
  private static singleton: PVZKeyMacro
  private scene: SCENE
  private hwnd = ref.NULL_POINTER; private pid = 0; private handle = ref.NULL_POINTER
  private constructor (gameName = 'Plants vs. Zombies', scene = SCENE.PE, resizeWindow = false) {
    this.scene = scene
    
    //Find Game
    this.findGame(gameName)

    //HideBorder
    if (resizeWindow) this.resizeWindow()
  }

  private findGame(gameName: string) {
    const PROCESS_ALL_ACCESS = 0x00100000 | 0x000F0000 | 0xFFF
    
    let classNamePtr = TEXT('MainWindow'), gameNamePtr = TEXT(gameName)
    this.hwnd = tasFns.FindWindowW(classNamePtr, gameNamePtr)
    let pidPtr = ref.alloc(W.LPDWORD) as FModel.FFIBuffer
    if (this.hwnd)
      tasFns.GetWindowThreadProcessId(this.hwnd, pidPtr)
  }

  private resizeWindow() {
    const WM_STYLE = -16
    const ACTION_MODIFIER = 0x0002 | 0x0200
    
    let windowStyle = tasFns.GetWindowLongPtrW(this.hwnd, WM_STYLE)
    windowStyle &= (~tasFn.constants.WS_CAPTION & ~tasFn.constants.WS_THICKFRAME)
    
    tasFns.SetWindowLongPtrW(this.hwnd, WM_STYLE, windowStyle)
    tasFns.SetWindowPos(this.hwnd, ref.NULL, 0, 0, 800, 600, ACTION_MODIFIER)
  }

  static initialize (gameName?: string, scene?: SCENE, resizeWindow?: boolean) {
    PVZKeyMacro.singleton = PVZKeyMacro.singleton || new PVZKeyMacro(gameName, scene, resizeWindow)
    return PVZKeyMacro.singleton
  }

  private leftClickAt (x: number, y: number) {
    const WM_LBUTTONDOWN = 0x201, WM_LBUTTONUP = 0x202, wparam = xyPosToWparam(x, y)
    tasFns.PostMessageW(this.hwnd, WM_LBUTTONDOWN, 0, wparam)
    tasFns.PostMessageW(this.hwnd, WM_LBUTTONUP, 0, wparam)
  }

  private rightClickAt (x: number, y: number) {
    const WM_RBUTTONDOWN = 0x204, WM_RBUTTONUP = 0x205, wparam = xyPosToWparam(x, y)
    tasFns.PostMessageW(this.hwnd, WM_RBUTTONDOWN, 0, wparam)
    tasFns.PostMessageW(this.hwnd, WM_RBUTTONUP, 0, wparam)
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