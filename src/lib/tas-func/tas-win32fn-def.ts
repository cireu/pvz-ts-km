import { DTypes as W, DModel as M, FModel, DStruct as S } from 'win32-api'

export const tasApiDef = new Map<string, FModel.DllFuncs>([['user32.dll', {
    FindWindowW: [W.HWND, [W.LPCWSTR, W.LPCWSTR]],
    PostMessageW: [W.BOOL, [W.HWND, W.UINT, W.LPARAM, W.WPARAM]],
    GetWindowThreadProcessId: [W.DWORD, [W.HWND, W.LPDWORD]],
    SetWindowLongPtrW: [W.LONG_PTR, [W.HWND, W.INT, W.LONG_PTR]],
    GetWindowLongPtrW:[W.LONG_PTR, [W.HWND, W.INT]],
    SetWindowPos: [W.BOOL, [W.HWND, W.HWND, W.INT, W.INT, W.INT, W.INT, W.UINT]],
    GetCursorPos: [W.BOOL, [W.LPPOINT]],
    SetCursorPos: [W.BOOL, [W.INT, W.INT]],
    GetWindowRect: [W.BOOL, [W.HWND, 'LPRECT']]
  }], 
    ['kernel32.dll', {
      ReadProcessMemory: [W.BOOL, [W.HANDLE, W.LPCVOID, W.LPVOID, W.SIZE_T, W.SIZE_T]],
      OpenProcess: [W.HANDLE, [W.DWORD, W.BOOL, W.DWORD]]
    }]
  ])


export interface TasWin32Fns {
  // functions in user32.dll
  FindWindowW(className: M.LPCWSTR, windowName: M.LPCWSTR): M.HWND
  PostMessageW(hwnd: M.HWND,
    message: M.UINT,
    lparam: M.LPARAM,
    wparam: M.WPARAM): M.BOOL
  GetWindowThreadProcessId(hwnd: M.HWND, pid_outer: M.LPDWORD): M.DWORD
  SetWindowLongPtrW(hwnd: M.HWND, index: M.INT, flags: M.LONG_PTR): M.LONG_PTR
  GetWindowLongPtrW(hwnd: M.HWND, index: M.INT): M.LONG_PTR
  SetWindowPos(hwnd: M.HWND,
    hwndInsertAfter: M.HWND,
    x: M.INT,
    y: M.INT,
    cx: M.INT,
    cy: M.INT,
    flags: M.UINT): M.BOOL
  // functions in kernel32.dll
  ReadProcessMemory(handle: M.HANDLE,
    baseAddress: M.LPCVOID,
    buffer_outer: M.LPVOID,
    size: M.SIZE_T,
    numOfBytesRead_outer: M.SIZE_T): M.BOOL
  OpenProcess(desiredAccess: M.DWORD, inheritHandle: M.BOOL, pid: M.DWORD): M.HANDLE
  GetWindowRect(hwnd: M.HWND, lpRect: Buffer): M.BOOL
}