import { IGoogleAddressComponent, PlaceType } from './definition';

/** For a given `type`, provide a predicate looking for `type` in the types of the input component */
const findByType = (type: PlaceType) => (component: IGoogleAddressComponent) => component.types.includes(type);

export function extractAddress(address_components: any) {
  const componentsKeys: PlaceType[] = [
    'street_number',
    'route',
    'locality',
    'administrative_area_level_1',
    'administrative_area_level_2',
    'country',
    'postal_code',
  ];
  const defaultComponent = { long_name: '', short_name: '', types: [] };

  // destructure components matching `componentsKeys`
  const [streetNumber, route, locality, administrativeAreaLevel1, administrativeAreaLevel2, country, postalCode] = componentsKeys
    .map(findByType)
    .map(fn => (address_components || []).find(fn) || defaultComponent);

  return {
    streetNumber,
    route,
    locality,
    administrativeAreaLevel1,
    administrativeAreaLevel2,
    country,
    postalCode,
  };
}
