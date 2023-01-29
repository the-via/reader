import fs from 'fs';
import {test, expect} from 'vitest';
import validateKeyboardDefinitionV2 from '../src/validated-types/keyboard-definition-v2.validator';

test('valid definition passes', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );
  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateKeyboardDefinitionV2(validDefinition)).not.toThrow();
});

test('invalid definition fails', async () => {
  const invalidDefinitionJson = await fs.promises.readFile(
    './test/data/v2_invalid_definition.json',
    'utf-8'
  );
  const invalidDefinition = JSON.parse(invalidDefinitionJson);

  expect(() => validateKeyboardDefinitionV2(invalidDefinition)).toThrow();
});

test('v3 definition fails', async () => {
  const v3DefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const v3Definition = JSON.parse(v3DefinitionJson);

  expect(() => validateKeyboardDefinitionV2(v3Definition)).toThrow();
});
