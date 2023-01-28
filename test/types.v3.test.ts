import fs from 'fs';
import {test, expect} from 'vitest';
import validateV3 from '../src/validated-types/keyboard-definition-v3.validator';

test('valid definition passes', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV3(validDefinition)).not.toThrow();
});

test('invalid definition fails', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_invalid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV3(validDefinition)).toThrow();
});

test('v2 definition fails', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV3(validDefinition)).toThrow();
});
