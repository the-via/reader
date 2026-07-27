import fs from 'fs';
import { test, expect } from 'vitest';
import {
  getVendorProductId,
  keyboardDefinitionV3ToVIADefinitionV3,
} from '../src';
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

test('preserves a dynamic definition name', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);
  definition.name = {
    options: ['Default Board', 'Alternate Board'],
    content: ['id_board_variant', 0, 5],
  };

  const viaDefinition = keyboardDefinitionV3ToVIADefinitionV3(definition);

  expect(viaDefinition.name).toEqual(definition.name);
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
  ).toThrowErrorMatchingInlineSnapshot(
    '[Error: \'Row,col\' pairs must be placed in the top-left legend in the KLE keymap provided in the definition.]'
  );
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

test(`Vendor ID of '0xFEED' should fail`, () => {
  expect(() => getVendorProductId({ productId: '0x1234', vendorId: '0xFEED' }))
    .toThrowErrorMatchingInlineSnapshot("[Error: '0xFEED' is not a valid vendorId.]");
  expect(() => getVendorProductId({ productId: '0x1234', vendorId: '0xfeed' }))
    .toThrowErrorMatchingInlineSnapshot("[Error: '0xFEED' is not a valid vendorId.]");
  expect(() =>
    getVendorProductId({ productId: '0xFEED', vendorId: '0x1234' })
  ).not.toThrow();
});

test('invalid common menu fails', async () => {
  const invalidCommonMenuDefinitionJson = await fs.promises.readFile(
    './test/data/v3_invalid_common_menu.json',
    'utf-8'
  );

  const invalidCommonMenuDefinition = JSON.parse(
    invalidCommonMenuDefinitionJson
  );

  expect(() =>
    keyboardDefinitionV3ToVIADefinitionV3(invalidCommonMenuDefinition)
  ).toThrowErrorMatchingInlineSnapshot('[Error: Common menus not for found for: wt_rgb_backlight]');
});
