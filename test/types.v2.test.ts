import fs from 'fs';
import {test, expect} from 'vitest';
import validateV2 from '../src/validated-types/keyboard-definition-v2.validator';

test('valid definition passes', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV2(validDefinition)).not.toThrow();
});

test('invalid definition fails', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_invalid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV2(validDefinition)).toThrow();
});

test('v3 definition fails', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );

  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateV2(validDefinition)).toThrow();
});
