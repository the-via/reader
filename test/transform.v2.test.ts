import fs from 'fs';
import {test, expect} from 'vitest';
import {keyboardDefinitionV2ToVIADefinitionV2} from '../src';
import validateViaDefinitionV2 from '../src/validated-types/via-definition-v2.validator';

test('transform KeyboardDefinition to VIADefinition', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );
  const validDefinition = JSON.parse(validDefinitionJson);
  const viaDefinition = keyboardDefinitionV2ToVIADefinitionV2(validDefinition);

  expect(() => validateViaDefinitionV2(viaDefinition)).not.toThrow();
});

test('invalid label map fails', async () => {
  const invalidLabelMapJson = await fs.promises.readFile(
    './test/data/v2_invalid_label_map.json',
    'utf-8'
  );
  const invalidLabelMap = JSON.parse(invalidLabelMapJson);

  expect(() =>
    keyboardDefinitionV2ToVIADefinitionV2(invalidLabelMap)
  ).toThrowErrorMatchingInlineSnapshot('"\'Row,col\' pairs must be placed in the top-left legend in the KLE keymap provided in the definition."');
});

test('can transform simple encoder', async () => {
  const simpleEncoderJson = await fs.promises.readFile(
    './test/data/v2_has_simple_encoder.json',
    'utf-8'
  );
  const simpleEncoder = JSON.parse(simpleEncoderJson);

  expect(() =>
    keyboardDefinitionV2ToVIADefinitionV2(simpleEncoder)
  ).not.toThrow();
});
