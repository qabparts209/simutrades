declare module 'cloudflare' {
  export interface CloudflareResult<T> {
    result: T;
    success: boolean;
    errors: any[];
    messages: any[];
  }

  export interface DnsRecord {
    type: string;
    name: string;
    content: string;
    proxied: boolean;
  }

  export interface ZoneSettings {
    minify: { status: string };
    browser_cache_ttl: { value: number };
  }

  export interface Zone {
    status: string;
    ssl: { status: string };
  }

  interface Analytics {
    dashboard(options: { zoneId: string; since: string }): Promise<CloudflareResult<{
      totals: {
        requests: { all: number };
        bandwidth: { all: number };
      }
    }>>;
  }

  export class Cloudflare {
    constructor(config: { token: string });
    
    dnsRecords: {
      browse(zoneId: string): Promise<CloudflareResult<DnsRecord[]>>;
    };
    
    zones: {
      read(zoneId: string): Promise<CloudflareResult<Zone>>;
      settings: {
        read(zoneId: string): Promise<CloudflareResult<ZoneSettings>>;
      };
      analytics: Analytics;
    };
  }

  export default Cloudflare;
} 