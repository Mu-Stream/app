import type { CapacitorConfig } from '@capacitor/cli';
import type { CapacitorElectronConfig } from '@capacitor-community/electron';

const config: CapacitorConfig & CapacitorElectronConfig = {
  appId: 'com.getmoussed.mu_stream',
  appName: 'Mu Stream',
  webDir: 'build',
  electron: {
    trayIconAndMenuEnabled: false,
  },
};

export default config;
