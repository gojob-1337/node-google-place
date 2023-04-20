import { IPlace, IPlaceQuery } from './definition';
import { extractAddress } from './extract-address';
import { httpRequest } from './http-request';

const ENDPOINT_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

/**
 * Consume Google Place API to retrieve the details of a place
 *
 * @param query API Request configuration.
 *
 * @throws {Error} (rejects) if Response status is not 'OK' or if no result is provided.
 *
 * @return Resolve with an `IPlace` or rejects.
 */
export async function retrieve(query: IPlaceQuery): Promise<IPlace> {
  const { id: placeid, key, language } = query;
  const queryParams = {
    placeid,
    key,
    language,
  };

  const response = await httpRequest(ENDPOINT_URL, queryParams);

  if (response.status !== 'OK') {
    throw new Error(`Unexpected retrieve result: ${response.status}`);
  } else if (!response.result) {
    throw new Error('Result is missing');
  }

  const { streetNumber, route, locality, administrativeAreaLevel1, administrativeAreaLevel2, country, postalCode } = extractAddress(
    response.result.address_components,
  );

  return {
    id: response.result.place_id,
    address: response.result.formatted_address,
    location: response.result.geometry.location,

    // address_components
    locality: locality.long_name || locality.short_name,
    administrativeAreaLevel1: administrativeAreaLevel1.long_name || administrativeAreaLevel1.short_name,
    administrativeAreaLevel2: administrativeAreaLevel2.long_name || administrativeAreaLevel2.short_name,
    stateCode: administrativeAreaLevel1.short_name,
    countryCode: country.short_name,
    country: country.long_name,
    postalCode: postalCode.long_name,
    streetNumber: streetNumber.short_name,
    route: route.long_name,
  };
}
