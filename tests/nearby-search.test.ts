const mockRequest = jest.fn();
jest.mock('request-promise-native', () => mockRequest);

import * as request from 'request-promise-native';

import { nearbySearch } from '../lib/nearby-search';

describe('nearbySearch', () => {
  let key: string;
  let location: [number, number];

  beforeEach(() => {
    key = 'AzErTy-0123!';
    location = [43.5258338, 5.4074925];
    mockRequest.mockImplementation(async () => ({ status: 'OK', results: [] }));
  });

  it('validate parameters', async () => {
    await nearbySearch({ key, location, language: 'CZ' });
    expect(request).toHaveBeenCalledWith({
      uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AzErTy-0123%21&language=CZ&location=43.5258338%2C5.4074925',
      json: true,
    });
  });

  it('returns results as-is if no "types" filter is given', async () => {
    const response = {
      status: 'OK',
      results: [
        { name: 'Aix-en-Provence', geometry: { location: { lat: 43.486821, lng: 5.495122 } } },
        { name: 'Marseille', geometry: { location: { lat: 43.296482, lng: 5.36978 } } },
      ],
    };
    mockRequest.mockImplementation(async () => response);

    const result = await nearbySearch({ key, location, rankby: 'distance', name: 'Aix' });
    expect(result).toBe(response.results);
  });

  it('filters on types', async () => {
    const response = {
      status: 'OK',
      results: [
        { name: 'Aix-en-Provence', geometry: { location: { lat: 43.486821, lng: 5.495122 } }, types: ['locality'] },
        { name: 'Marseille', geometry: { location: { lat: 43.296482, lng: 5.36978 } }, types: ['political'] },
      ],
    };
    mockRequest.mockImplementation(async () => response);

    const result = await nearbySearch({ key, location, rankby: 'distance', name: 'Aix' }, ['locality']);
    expect(result).toEqual([response.results[0]]);
  });

  it('handles zero results', async () => {
    // default mocked implem already returns no result
    const result = await nearbySearch({ key, location, rankby: 'distance', name: 'Aix' }, ['locality']);
    expect(result).toEqual([]);
  });

  it('throws if both rankby=distance and radius are given', async () => {
    expect.assertions(2);

    try {
      await nearbySearch({ key, location, rankby: 'distance', radius: 500 });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch(/cannot be used together/i);
    }
  });

  it('rejects on any error', async () => {
    const response = {
      status: 'ACCESS_DENIED',
      results: [],
    };
    mockRequest.mockImplementation(async () => response);

    expect.assertions(2);

    try {
      await nearbySearch({ key, location, rankby: 'distance', name: 'Aix' });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch(/Unexpected nearby-search result/i);
    }
  });
});
