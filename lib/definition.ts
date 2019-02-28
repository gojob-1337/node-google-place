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
  | 'political'
  | 'postal_code'
  | 'route'
  | 'street_number'
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
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  countryCode: string;
  country: string;
  postalCode: string;
  streetNumber: string;
  route: string;
}

export interface IGoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: PlaceType[];
}

export interface INearbySearchQuery {
  key: string;
  location: [number, number];
  radius?: number;
  rankby?: 'prominence' | 'distance';

  type?: PlaceType;
  keyword?: string;
  language?: string;
  minprice?: string;
  maxprice?: string;
  name?: string;
  pagetoken?: string;
}

export interface IGeoPoint {
  lat: number;
  lng: number;
}

export interface INearbyResult {
  geometry: {
    location: IGeoPoint;
    viewport: {
      northeast: IGeoPoint;
      southwest: IGeoPoint;
    };
  };
  icon: string;
  id: string;
  name: string;
  photos: [
    {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }
  ];
  place_id: string;
  rating: number;
  reference: string;
  scope: string;
  types: PlaceType[];
  vicinity: string;
}

export interface IReverseGeocodeQuery {
  key: string;
  latlng: IGeoPoint | string;
  language?: string;
}
