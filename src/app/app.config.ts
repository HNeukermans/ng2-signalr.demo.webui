import { SignalRConfiguration } from 'ng2-signalr';

const signalrConfig = new SignalRConfiguration();
signalrConfig.hubName = 'Ng2SignalRHub';
signalrConfig.qs = { user: 'Hannes' };
signalrConfig.url = process.env.SIGNALR_URL;

export const signalrConfiguration = signalrConfig;
