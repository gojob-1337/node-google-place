import { IPlace, IReverseGeocodeQuery } from './definition';
import { extractAddress } from './extract-address';
import { httpRequest } from './http-request';

const ENDPOINT_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function reverseGeocode(query: IReverseGeocodeQuery): Promise<IPlace> {
  const { key, language } = query;
  let { latlng } = query;

  if (typeof latlng === 'object') {
    latlng = [latlng.lat, latlng.lng].join(',');
  }

  const queryParams = {
    latlng,
    key,
    language,
  };

  const response = await httpRequest(ENDPOINT_URL, queryParams);

  if (response.status !== 'OK') {
    throw new Error(`Unexpected reverseGeocode result: ${response.status}`);
  } else if (!response.results) {
    throw new Error('Result is missing');
  }

  return response.results.map((result: any) => {
    const { streetNumber, route, locality, administrativeAreaLevel1, administrativeAreaLevel2, country, postalCode } = extractAddress(
      result.address_components,
    );

    return {
      id: result.place_id,
      address: result.formatted_address,
      location: result.geometry.location,

      // address_components
      locality: locality.long_name || locality.short_name,
      administrativeAreaLevel1: administrativeAreaLevel1.long_name || administrativeAreaLevel1.short_name,
      administrativeAreaLevel2: administrativeAreaLevel2.long_name || administrativeAreaLevel2.short_name,
      countryCode: country.short_name,
      country: country.long_name,
      postalCode: postalCode.long_name,
      streetNumber: streetNumber.short_name,
      route: route.long_name,
    };
  });
}
