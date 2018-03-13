import * as request from 'request-promise-native';
import { encode } from './tools';

export interface IAutocompleteQuery {
  key: string;
  input: string;
  language?: string;
  country?: string;
  types?: string[];
}

export interface IPrediction {
  id: string;
  name: string;
}

/**
 * Consume Google Place Autocomplete API
 * @param {IAutocompleteQuery} query
 * @return {Promise<IPrediction[]>}
 */
export async function autocomplete(query: IAutocompleteQuery): Promise<IPrediction[]> {
  const response = await request({
    uri:
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${query.key}&types=(regions)` +
      encode('language', query.language) +
      encode('components', query.country, 'country:') +
      encode('input', query.input),
    json: true,
  });

  if (response.status !== 'OK' && response.status !== 'ZERO_RESULTS') {
    throw new Error(`Unexpected autocomplete result: ${response.status}`);
  }

  let predictions = response.predictions || [];

  if (query.types && query.types.length) {
    const types: string[] = query.types;
    predictions = predictions.filter((prediction: any) => prediction.types.some((type: string) => types.indexOf(type) >= 0));
  }

  return predictions.map((prediction: any) => ({ id: prediction.place_id, name: prediction.description }));
}
