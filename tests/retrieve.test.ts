import { mockedRequest } from './mock';

import { retrieve } from '../lib/retrieve';

describe('retrieve', () => {
  it('validate parameters', async () => {
    await retrieve({ key: 'AzErTy-0123!', id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY', language: 'fr' });
    expect(mockedRequest).toHaveBeenCalledWith({
      uri: 'https://maps.googleapis.com/maps/api/place/details/json?key=AzErTy-0123%21&language=fr&placeid=ChIJ-RzUxt8ethIRksIaOl-0tJY',
      json: true,
    });
  });

  it('returns results', async () => {
    const result = await retrieve({ key: 'AzErTy-0123!', id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY', language: 'fr' });
    expect(result).toEqual({
      address: 'Port-de-Bouc, France',
      administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
      administrativeAreaLevel2: 'Bouches-du-Rhône',
      postalCode: '13110',
      country: 'France',
      countryCode: 'FR',
      id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY',
      locality: 'Port-de-Bouc',
      location: { lat: 43.405449, lng: 4.985931 },
      postalCode: '13110',
    });
  });

  it('handles zero results', async () => {
    await expect(retrieve({ key: 'AzErTy-0123!', id: 'invalid-place-id', language: 'fr' })).rejects.toThrow(
      'Unexpected retrieve result: INVALID_REQUEST',
    );
  });

  it('rejects on missing result', async () => {
    await expect(retrieve({ key: 'AzErTy-0123!', id: 'missing-result', language: 'fr' })).rejects.toThrow('Result is missing');
  });

  it('rejects on any error', async () => {
    await expect(retrieve({ key: 'AzErTy-0123!', id: 'invalid-key', language: 'fr' })).rejects.toThrow('Unexpected retrieve result: REQUEST_DENIED');
  });
});
