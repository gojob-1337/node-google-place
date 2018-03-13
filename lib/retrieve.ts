import * as request from 'request-promise-native';
import { encode, findComponent } from './tools';

export interface IPlaceQuery {
  key: string;
  id: string;
  language: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlace {
  id: string;
  address: string;
  location: ILocation;
  locality: string;
  countryCode: string;
  country: string;
}

/**
 * Consume Google Place API tp retrieve the details of a place
 * @param {IPlaceQuery} query
 * @return {Promise<IPlace>}
 */
export async function retrieve(query: IPlaceQuery): Promise<IPlace> {
  const response = await request({
    uri: `https://maps.googleapis.com/maps/api/place/details/json?key=${query.key}&placeid=${query.id}` + encode('language', query.language),
    json: true,
  });

  if (response.status !== 'OK') {
    throw new Error(`Unexpected retrieve result: ${response.status}`);
  }

  if (!response.result) {
    throw new Error('Result is missing');
  }

  const locality = findComponent('locality', response.result.address_components);
  const country = findComponent('country', response.result.address_components);

  return {
    id: response.result.place_id,
    address: response.result.formatted_address,
    location: response.result.geometry.location,
    locality: locality ? locality.long_name || locality.short_name : '',
    countryCode: country ? country.short_name : '',
    country: country ? country.long_name : '',
  };
}
