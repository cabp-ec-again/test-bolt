import { HttpVerbsEnum } from '~/app/enums/HttpVerbsEnum';
import { FetchCacheEnum, type FetchOptionsInterface } from '~/app/api/dataFetcher/FetchOptionsInterface';

export function dataFetcher(
  url: string,
  method: HttpVerbsEnum = HttpVerbsEnum.GET,
  body?: string | undefined,
  cache?: FetchCacheEnum
) {
  const options: FetchOptionsInterface = { cache: cache ?? FetchCacheEnum.noCache };

  if (method === HttpVerbsEnum.POST && body) {
    options.body = body;
  }

  return fetch(
    url,
    {
      method,
      ...options
    })
    .then((res) => res.json());
}
