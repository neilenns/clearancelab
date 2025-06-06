export interface VatsimController {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  text_atis: string | string[] | null;
  last_updated: string;
  logon_time: string;
}
