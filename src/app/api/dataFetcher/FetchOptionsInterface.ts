export enum FetchCacheEnum {
  default = 'default',
  noStore = 'no-store',
  reload = 'reload',
  noCache = 'no-cache',
  forceCache = 'force-cache',
  onlyIfCached = 'only-if-cached'
}

export interface FetchOptionsInterface {
  body?: string;
  cache?: FetchCacheEnum;
  headers?: Headers;
}
