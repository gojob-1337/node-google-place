import { mockedRequest } from './mock';

import { reverseGeocode } from '../lib/reverse-geocode';

describe('geocode', () => {
  it('validate parameters', async () => {
    await reverseGeocode({ key: 'AzErTy-0123!', latlng: { lat: 43.529742, lng: 5.447426999999998 } });
    expect(mockedRequest).toHaveBeenCalledWith({
      uri: 'https://maps.googleapis.com/maps/api/geocode/json?key=AzErTy-0123%21&latlng=43.529742%2C5.447426999999998',
      json: true,
    });
  });

  it('returns address results from latlng', async () => {
    const id = 'ChIJ-RzUxt8ethIRksIaOl-0tJY';
    const results = await reverseGeocode({ key: 'AzErTy-0123!', latlng: { lat: 43.529742, lng: 5.447426999999998 } });
    expect(results).toEqual([
      {
        address: '3 Rue des Cordeliers, 13100 Aix-en-Provence, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhône',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJ8ZBGJ72NyRIRGmMZtrCkjxw',
        locality: 'Aix-en-Provence',
        location: { lat: 43.5295506, lng: 5.4472602 },
        postalCode: '13100',
        route: 'Rue des Cordeliers',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '3',
      },
      {
        address: '1 Rue des Cordeliers, 13100 Aix-en-Provence, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhône',
        country: 'France',
        countryCode: 'FR',
        id: 'EjMxIFJ1ZSBkZXMgQ29yZGVsaWVycywgMTMxMDAgQWl4LWVuLVByb3ZlbmNlLCBGcmFuY2UiGhIYChQKEgmxv4YgvY3JEhEYyqA2PG_WWxAB',
        locality: 'Aix-en-Provence',
        location: { lat: 43.529625, lng: 5.4475289 },
        postalCode: '13100',
        route: 'Rue des Cordeliers',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '1',
      },
      {
        address: 'Rue des Cordeliers, 13100 Aix-en-Provence, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhône',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJsb-GIL2NyRIRGcqgNjxv1ls',
        locality: 'Aix-en-Provence',
        location: { lat: 43.5296129, lng: 5.44743 },
        postalCode: '13100',
        route: 'Rue des Cordeliers',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: 'Vieille Ville, 13100 Aix-en-Provence, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhone',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJfUrvZL2NyRIRUpKzhV_vh9A',
        locality: 'Aix-en-Provence',
        location: { lat: 43.5283925, lng: 5.4476422 },
        postalCode: '13100',
        route: '',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: '13100 Saint-Antonin-sur-Bayon, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhone',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJtcHVsaePyRIRMEsgUqkZCBw',
        locality: 'Saint-Antonin-sur-Bayon',
        location: { lat: 43.5338335, lng: 5.509246999999999 },
        postalCode: '13100',
        route: '',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: 'Aix-en-Provence, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhone',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJWRK5BKONyRIRo4i2yL5TuVw',
        locality: 'Aix-en-Provence',
        location: { lat: 43.529742, lng: 5.447426999999999 },
        postalCode: '',
        route: '',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: 'Bouches-du-Rhone, France',
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: 'Bouches-du-Rhone',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJWxNFLN8CthIRQCaP_aUZCAM',
        locality: '',
        location: { lat: 43.59116789999999, lng: 5.3102505 },
        postalCode: '',
        route: '',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: "Provence-Alpes-Côte d'Azur, France",
        administrativeAreaLevel1: "Provence-Alpes-Côte d'Azur",
        administrativeAreaLevel2: '',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJrVP5ihlothIRp9EWPSaQFrc',
        locality: '',
        location: { lat: 43.9351691, lng: 6.0679194 },
        postalCode: '',
        route: '',
        stateCode: "Provence-Alpes-Côte d'Azur",
        streetNumber: '',
      },
      {
        address: 'France',
        administrativeAreaLevel1: '',
        administrativeAreaLevel2: '',
        country: 'France',
        countryCode: 'FR',
        id: 'ChIJMVd4MymgVA0R99lHx5Y__Ws',
        locality: '',
        location: { lat: 46.227638, lng: 2.213749 },
        postalCode: '',
        route: '',
        stateCode: '',
        streetNumber: '',
      },
    ]);
  });

  it('handles zero results', async () => {
    await expect(reverseGeocode({ key: 'AzErTy-0123!', latlng: 'invalid-geocode-latlng', language: 'fr' })).rejects.toThrow(
      'Unexpected reverseGeocode result: INVALID_REQUEST',
    );
  });

  it('rejects on missing result', async () => {
    await expect(reverseGeocode({ key: 'AzErTy-0123!', latlng: 'missing-result', language: 'fr' })).rejects.toThrow('Result is missing');
  });

  it('rejects on any error', async () => {
    await expect(reverseGeocode({ key: 'AzErTy-0123!', latlng: 'invalid-key', language: 'fr' })).rejects.toThrow(
      'Unexpected reverseGeocode result: REQUEST_DENIED',
    );
  });
});
