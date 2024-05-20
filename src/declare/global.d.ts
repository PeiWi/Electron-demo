declare global {
  var __static: string;
  interface Window {
    electronAPI: IElectronAPI;
  }
}

export {};