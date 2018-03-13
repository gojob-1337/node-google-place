export function encode(key: string, value: string | undefined, prefix: string = ''): string {
  const encoded = encodeURIComponent((value || '').trim().toLowerCase());
  return encoded ? `&${key}=${prefix}${encoded}` : '';
}

export interface IGoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export function findComponent(type: string, components: IGoogleAddressComponent[]): IGoogleAddressComponent | undefined {
  return components.find(component => component.types.indexOf(type) >= 0);
}
