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

  it('returns city results', async () => {
    const id = 'ChIJ-RzUxt8ethIRksIaOl-0tJY';
    const result = await retrieve({ id, key: 'AzErTy-0123!', language: 'fr' });
    expect(result).toEqual({
      id,
      streetNumber: '',
      route: '',
      stateCode: "Provence-Alpes-Côte d'Azur",
      address: 'Port-de-Bouc, France',
      administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
      administrativeAreaLevel2: 'Bouches-du-Rhône',
      country: 'France',
      countryCode: 'FR',
      locality: 'Port-de-Bouc',
      location: { lat: 43.405449, lng: 4.985931 },
      postalCode: '13110',
    });
  });

  it('returns address results', async () => {
    const id = 'ChIJaZSfVj9y5kcRFepem3_h2s8';
    const result = await retrieve({ id, key: 'AzErTy-0123!', language: 'fr' });
    expect(result).toEqual({
      id,
      address: '40 Avenue des Terroirs de France, 75012 Paris, France',
      administrativeAreaLevel1: 'Île-de-France',
      administrativeAreaLevel2: 'Paris',
      country: 'France',
      countryCode: 'FR',
      locality: 'Paris',
      location: { lat: 48.8316638, lng: 2.3885332 },
      postalCode: '75012',
      route: 'Avenue des Terroirs de France',
      stateCode: 'Île-de-France',
      streetNumber: '40',
    });
  });

  it('returns state short code (usa address)', async () => {
    const id = 'ChIJs9ETUBW9-IcRdZOTQ-uLQz0';
    const result = await retrieve({ id, key: 'AzErTy-0123!', language: 'en' });

    expect(result).toEqual({
      id,
      address: 'Eau Claire, WI, USA',
      administrativeAreaLevel1: 'Wisconsin',
      administrativeAreaLevel2: 'Eau Claire County',
      country: 'United States',
      countryCode: 'US',
      locality: 'Eau Claire',
      location: { lat: 44.811349, lng: -91.4984941 },
      postalCode: '',
      route: '',
      stateCode: 'WI',
      streetNumber: '',
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
