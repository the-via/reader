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

test('range constraints use the shared menu schema', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v2_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);
  definition.customMenus = [
    {
      label: 'Thresholds',
      content: [
        {
          label: 'General',
          content: [
            {
              label: 'Actuation',
              type: 'range',
              options: [1, 255],
              constraints: [
                {
                  operator: '>=',
                  reference: ['id_release', 0, 2],
                  offset: 50,
                  onViolation: 'push'
                }
              ],
              content: ['id_actuation', 0, 1]
            },
            {
              label: 'Release',
              type: 'range',
              options: [1, 255],
              content: ['id_release', 0, 2]
            }
          ]
        }
      ]
    }
  ];

  expect(() => validateKeyboardDefinitionV2(definition)).not.toThrow();
  definition.customMenus[0].content[0].content[0].constraints[0].operator =
    '==';
  expect(() => validateKeyboardDefinitionV2(definition)).toThrow();
});
