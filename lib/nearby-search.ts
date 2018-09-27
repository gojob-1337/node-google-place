import { INearbyResult, INearbySearchQuery, PlaceType } from './definition';
import { httpRequest } from './http-request';

const ENDPOINT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

interface IApiResponse {
  results: INearbyResult[];
  status: string;
}

/**
 * Perform a "Nearby Search" request to Google Places API.
 *
 * @param query Request configuration.
 * @param types (optional) Filter on `types` of the results.
 *
 * @throws {Error} (rejects) if Response status is not 'OK' or 'ZERO_RESULTS'.
 *
 * @return Resolve with an array of `INearbyResult`, or rejects.
 */
export async function nearbySearch(query: INearbySearchQuery, types?: PlaceType[]) {
  if (query.radius && query.rankby === 'distance') {
    throw new Error('Parameters "radius" and "rankby=distance" cannot be used together');
  }

  const queryParams = {
    ...query,
    location: query.location.join(','),
  };

  const { status, results }: IApiResponse = await httpRequest(ENDPOINT_URL, queryParams);

  if (status !== 'OK' && status !== 'ZERO_RESULTS') {
    throw new Error(`Unexpected nearby-search result: ${status}`);
  }

  if (!results || results.length === 0) {
    return [];
  }

  if (types && types.length > 0) {
    return results.filter(result => result.types.some(type => types.includes(type)));
  }

  return results;
}
