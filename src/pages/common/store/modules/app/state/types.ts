export interface SideBar {
  opened: boolean;
  withoutAnimation: boolean;
}

export interface AppState {
  sidebar: SideBar;
  sidebarStatus: boolean;
  device: string;
  isLoading: boolean;
  language: string;
  theme: string;
  desktopNavWidth: number;
  varyWidth: number;
}