import { Endpoint } from "src/app/core/endpoints.constants";

export class MenuItem {
  title?: string;
  link?: string;
  matIcon?: string;
  permissions?: string[];
  children?: MenuItem[];
}

export interface ValueLabel {
  value: string;
  label: string;
}

export class RouteData {
  heading: string;
  subtitle: string;
  endpoint: string;

  constructor(heading: string, subtitle: string, endpoint: Endpoint) {
    this.heading = heading;
    this.subtitle = subtitle;
    this.endpoint = endpoint.toString();
  }
}