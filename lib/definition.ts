export interface IAutocompleteQuery {
  key: string;
  input: string;
  language?: string;
  countries?: string[];
  types?: AutocompleteResultType;
  placeTypes?: PlaceType[];
}

export interface IPrediction {
  id: string;
  name: string;
}

export type AutocompleteResultType = '(cities)' | '(regions)' | 'geocode' | 'address' | 'establishment';
export type PlaceType =
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'administrative_area_level_3'
  | 'country'
  | 'locality'
  | 'postal_code'
  | 'sublocality';

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

export interface IGoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: PlaceType[];
}
