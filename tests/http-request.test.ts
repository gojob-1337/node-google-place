jest.mock('request-promise-native');

import * as request from 'request-promise-native';

import { httpRequest } from '../lib/http-request';

describe('http-request', () => {
  let uri: string;

  beforeEach(() => {
    uri = 'https://google.com';
    ((request as any) as jest.Mock).mockClear();
  });

  it('call request with the given URI (and json enabled)', () => {
    httpRequest(uri);
    expect(request).toHaveBeenCalledWith({ uri, json: true });
  });

  it('stringify queryParams and concat the result to uri', () => {
    const q = 'hm';
    const type = 'search';
    const queryParams = { q, type };
    const completeUri = `${uri}?q=${q}&type=${type}`;

    httpRequest(uri, queryParams);
    expect(request).toHaveBeenCalledWith({ uri: completeUri, json: true });
  });
});
