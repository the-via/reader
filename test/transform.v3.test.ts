import fs from 'fs';
import {test, expect} from 'vitest';
import {keyboardDefinitionV3ToVIADefinitionV3} from '../src';
import validateViaDefinitionV3 from '../src/validated-types/via-definition-v3.validator';

test('transform KeyboardDefinition to VIADefinition', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const validDefinition = JSON.parse(validDefinitionJson);
  const viaDefinition = keyboardDefinitionV3ToVIADefinitionV3(validDefinition);

  expect(() => validateViaDefinitionV3(viaDefinition)).not.toThrow();
});

test('invalid label map fails', async () => {
  const invalidLabelMapJson = await fs.promises.readFile(
    './test/data/v3_invalid_label_map.json',
    'utf-8'
  );
  const invalidLabelMap = JSON.parse(invalidLabelMapJson);

  expect(() =>
    keyboardDefinitionV3ToVIADefinitionV3(invalidLabelMap)
  ).toThrow();
});

test('can transform simple encoder', async () => {
  const simpleEncoderJson = await fs.promises.readFile(
    './test/data/v3_has_simple_encoder.json',
    'utf-8'
  );
  const simpleEncoder = JSON.parse(simpleEncoderJson);

  expect(() =>
    keyboardDefinitionV3ToVIADefinitionV3(simpleEncoder)
  ).not.toThrow();
});
