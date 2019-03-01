# @gojob/google-place

[![travis build](https://img.shields.io/travis/gojob-1337/node-google-place.svg)](https://travis-ci.org/gojob-1337/node-google-place)
[![Coverage Status](https://coveralls.io/repos/github/gojob-1337/node-google-place/badge.svg?branch=master)](https://coveralls.io/github/gojob-1337/node-google-place?branch=master)

## Description

This package is a library for Node.js to consume the Google Place autocomplete & details API.
It returns a small subset of their data.

## Installation

```
yarn add @gojob/google-place
```

## Usage

```typescript
import * as gp from '@gojob/google-place';
```

### Autocomplete API

```typescript
const results = await gp.autocomplete({
    key: 'YOUR_API_KEY',
    input: 'Port-de-Bouc',
    language: 'fr',
    countries: ['fr'],
});
```


#### gp.autocomplete(`query`)

|   Name   |  Type  |                                         Description                                                    |
|:--------:|:------:|:-------------------------------------------------------------------------------------------------------|
| key      | string | Google API Key                                                                                         |
| input    | string | Searched entry                                                                                         |
| language | string | Language to use (optional) [Google Code](https://developers.google.com/maps/faq?hl=fr#languagesupport) |
| countries  | string[] | Filter on a country (optional) [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) |


Returns a list of prediction or throw if an error occurred.

```typescript
interface IPrediction {
  id: string;
  name: string;
}
```

As:

| Name |  Type  | Description |
|:----:|:------:|:------------|
| id   | string | Place id    |
| name | string | Place name  |


#### gp.retrieve(`query`)

```typescript
const place = gp.retrieve({
    key: 'YOUR_API_KEY',
    id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY',
    language: 'fr',
});
```

As:

|   Name   |  Type  |                                         Description                                                    |
|:--------:|:------:|:-------------------------------------------------------------------------------------------------------|
| key      | string | Google API Key                                                                                         |
| id       | string | Searched entry                                                                                         |
| language | string | Language to use (optional) [Google Code](https://developers.google.com/maps/faq?hl=fr#languagesupport) |


Returns a place or throw if an error occurred.


```typescript
export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlace {
  id: string;
  address: string;
  location: ILocation;
  postalCode: string;
  locality: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  countryCode: string;
  country: string;
}
```

As:

|     Name                 |  Type  |             Description                          |
|:------------------------:|:------:|:-------------------------------------------------|
| id                       | string | Place id                                         |
| address                  | string | Formatted address                                |
| location                 | object | Latitude and longitude coordinates               |
| postalCode               | string | Postal code                                      |
| locality                 | string | Locality name (long or short name)               |
| administrativeAreaLevel1 | string | Administrative Area Level 1 (long or short name) |
| administrativeAreaLevel2 | string | Administrative Area Level 2 (long or short name) |
| countryCode              | string | Country short name                               |
| country                  | string | Country name (long name)                         |


_postalCode, administrativeAreaLevel1 or administrativeAreaLevel2 may be empty string_

#### gp.reverseGeocode(opts)

```typescript
const place = gp.reverseGeocode({
    key: 'YOUR_API_KEY',
    latlng: 'XXX,YYY',
    language: 'fr',
});
```

As:

|   Name   |  Type  |                                         Description                                                    |
|:--------:|:------:|:-------------------------------------------------------------------------------------------------------|
| key      | string | Google API Key                                                                                         |
| latlng   | string | Latitude and longitude coordinates (coma separated)                                                    |
| language | string | Language to use (optional) [Google Code](https://developers.google.com/maps/faq?hl=fr#languagesupport) |

Find an address from a location coordinates. Returns a `IPlace`.
