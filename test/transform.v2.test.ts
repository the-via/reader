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
