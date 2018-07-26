import { IAutocompleteQuery, PlaceType } from './definition';
import { httpRequest } from './http-request';

interface IStringMatchingResult {
  length: number;
  offset: number;
}

interface IGooglePrediction {
  description: string;
  id: string;
  matched_substrings: IStringMatchingResult[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: IStringMatchingResult[];
    secondary_text: string;
  };
  terms: [{ offset: number; value: string }];
  types: PlaceType[];
}

interface IApiResponse {
  predictions: IGooglePrediction[];
  status: string;
}

const ENDPOINT_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

/**
 * Consume Google Place Autocomplete API.
 *
 * @param {IAutocompleteQuery} query
 *
 * @throws {Error} (rejects) if Response status is not 'OK' or 'ZERO_RESULTS'.
 *
 * @return Resolve with an array of `IPrediction`, or rejects.
 */
export async function autocomplete(query: IAutocompleteQuery) {
  const { key, input, language = '', countries = [], types = '(regions)', placeTypes = [] } = query;
  const queryParams = {
    input,
    key,
    language,
    types,
    // expected url format: "&components=country:fr|country:mo|country:mc"
    components: countries
      .filter(country => country && country.trim() !== '')
      .map(country => `country:${country.trim().toLowerCase()}`)
      .join('|'),
  };

  const response: IApiResponse = await httpRequest(ENDPOINT_URL, queryParams);

  if (response.status !== 'OK' && response.status !== 'ZERO_RESULTS') {
    throw new Error(`Unexpected autocomplete result: ${response.status}`);
  }

  let predictions = response.predictions || [];

  if (placeTypes && placeTypes.length) {
    predictions = predictions.filter(prediction => prediction.types.some(type => placeTypes.includes(type)));
  }

  return predictions.map(prediction => ({ id: prediction.place_id, name: prediction.description }));
}
