import * as queryString from 'query-string';
import * as request from 'request-promise-native';

export interface IQueryParams {
  [param: string]: string;
}

export function httpRequest(uri: string, queryParams?: IQueryParams) {
  if (queryParams) {
    const qParams = Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value;
        }

        return acc;
      },
      {} as IQueryParams,
    );
    const query = queryString.stringify(qParams);

    if (query) {
      uri = `${uri}?${query}`;
    }
  }

  return request({ uri, json: true });
}
