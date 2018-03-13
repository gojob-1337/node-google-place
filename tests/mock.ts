import * as fs from 'fs';
import * as path from 'path';
import * as queryString from 'query-string';
import { promisify } from 'util';

const ASSETS_PATH = path.resolve(path.join(__dirname, 'assets'));
const readFile = promisify(fs.readFile);

jest.mock('request-promise-native');
import * as request from 'request-promise-native';
request.mockImplementation(async (query: any): Promise<any> => {
  const parameters = queryString.parse(query.uri);
  const content = await readFile(path.join(ASSETS_PATH, `${parameters.input || parameters.placeid}.json`));
  return JSON.parse(content.toString());
});

export { request };
export * from '../lib/autocomplete';
export * from '../lib/retrieve';
