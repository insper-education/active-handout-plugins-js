import { string } from "prop-types";

export interface INotifyOldPage {
  text?: string;
}

export interface IReport {
  url?: string;
  "api-base"?: string;
}

export interface IAuthConfig {
  "email-password-url"?: string;
  "login-url"?: string;
  "reset-password-url"?: string;
  "user-url"?: string;
  "watch-urls"?: string;
}

export interface IHandoutConfig {
  calendar?: string;
  counter?: string[];
  "notify-old-page"?: INotifyOldPage;
  auth?: IAuthConfig;
  "mount-point"?: string;
  report?: IReport;
}

declare global {
  interface Window {
    ihandout_config: IHandoutConfig;
  }
}
