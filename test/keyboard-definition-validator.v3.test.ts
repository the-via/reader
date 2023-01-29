import fs from 'fs';
import {test, expect} from 'vitest';
import validateKeyboardDefinitionV3 from '../src/validated-types/keyboard-definition-v3.validator';

test('valid definition passes', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const validDefinition = JSON.parse(validDefinitionJson);

  expect(() => validateKeyboardDefinitionV3(validDefinition)).not.toThrow();
});

test('invalid definition fails', async () => {
  const invalidDefinitionJson = await fs.promises.readFile(
    './test/data/v3_invalid_definition.json',
    'utf-8'
  );
  const invalidDefinition = JSON.parse(invalidDefinitionJson);

  expect(() => validateKeyboardDefinitionV3(invalidDefinition)).toThrow();
});

test('v2 definition fails', async () => {
  const v2DefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );
  const v2Definition = JSON.parse(v2DefinitionJson);

  expect(() => validateKeyboardDefinitionV3(v2Definition)).toThrow();
});
