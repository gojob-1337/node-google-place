import { autocomplete, request } from './mock';

describe('autocomplete', () => {
  it('validate parameters', async () => {
    await autocomplete({ country: 'UK', key: 'AzErTy-0123!', input: 'PDB', language: 'CZ' });
    expect(request).toHaveBeenCalledWith({
      uri:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AzErTy-0123!&types=(regions)&language=cz&components=country:uk&input=pdb',
      json: true,
    });
  });

  it('validate optional parameters', async () => {
    await autocomplete({ key: 'AzErTy-0123!', input: 'PDB' });
    expect(request).toHaveBeenCalledWith({
      uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AzErTy-0123!&types=(regions)&input=pdb',
      json: true,
    });
  });

  it('returns results', async () => {
    const result = await autocomplete({ country: 'UK', key: 'AzErTy-0123!', input: 'PDB', language: 'CZ' });
    expect(result).toEqual([
      { id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY', name: 'Port-de-Bouc, France' },
      { id: 'ChIJ2cfM8AO8AUgRTE4iT2zNHRE', name: 'Port de By, Bégadan, France' },
      { id: 'ChIJMW6TAC9DAUgRIIvuYJLTBQQ', name: 'Port-des-Barques, France' },
      { id: 'ChIJr67zPDyqC0gRoOC8T0gUDAQ', name: 'Port-en-Bessin-Huppain, France' },
      { id: 'ChIJFzI8kLpgsBIRAG9nFiGIBwQ', name: 'Le Barcarès, France' },
    ]);
  });

  it('filters on types', async () => {
    const result = await autocomplete({ country: 'UK', key: 'AzErTy-0123!', input: 'PDB', language: 'CZ', types: ['locality'] });
    expect(result).toEqual([
      { id: 'ChIJ-RzUxt8ethIRksIaOl-0tJY', name: 'Port-de-Bouc, France' },
      { id: 'ChIJMW6TAC9DAUgRIIvuYJLTBQQ', name: 'Port-des-Barques, France' },
      { id: 'ChIJr67zPDyqC0gRoOC8T0gUDAQ', name: 'Port-en-Bessin-Huppain, France' },
      { id: 'ChIJFzI8kLpgsBIRAG9nFiGIBwQ', name: 'Le Barcarès, France' },
    ]);
  });

  it('handles zero results', async () => {
    const result = await autocomplete({ country: 'UK', key: 'AzErTy-0123!', input: 'zero', language: 'CZ' });
    expect(result).toEqual([]);
  });

  it('rejects on any error', async () => {
    await expect(autocomplete({ country: 'UK', key: 'AzErTy-0123!', input: 'invalid-key', language: 'CZ' })).rejects.toThrow(
      'Unexpected autocomplete result: REQUEST_DENIED',
    );
  });
});