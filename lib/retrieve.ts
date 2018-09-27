import { IGoogleAddressComponent, IPlace, IPlaceQuery, PlaceType } from './definition';
import { httpRequest } from './http-request';

const ENDPOINT_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

function findComponent(type: PlaceType, components: IGoogleAddressComponent[]): IGoogleAddressComponent | undefined {
  return components.find(component => component.types.includes(type));
}

/**
 * Consume Google Place API tp retrieve the details of a place
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

  const locality = findComponent('locality', response.result.address_components);
  const administrativeAreaLevel1 = findComponent('administrative_area_level_1', response.result.address_components);
  const administrativeAreaLevel2 = findComponent('administrative_area_level_2', response.result.address_components);
  const country = findComponent('country', response.result.address_components);
  const postalCode = findComponent('postal_code', response.result.address_components);

  return {
    id: response.result.place_id,
    address: response.result.formatted_address,
    location: response.result.geometry.location,
    locality: locality ? locality.long_name || locality.short_name : '',
    administrativeAreaLevel1: administrativeAreaLevel1 ? administrativeAreaLevel1.long_name || administrativeAreaLevel1.short_name : '',
    administrativeAreaLevel2: administrativeAreaLevel2 ? administrativeAreaLevel2.long_name || administrativeAreaLevel2.short_name : '',
    countryCode: country ? country.short_name : '',
    country: country ? country.long_name : '',
    postalCode: postalCode ? postalCode.long_name : '',
  };
}
