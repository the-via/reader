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

test('dynamic definition name passes', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);
  definition.name = {
    options: ['Default Board', 'Alternate Board'],
    content: ['id_board_variant', 0, 5],
  };

  expect(() => validateKeyboardDefinitionV3(definition)).not.toThrow();
});

test('dynamic definition name requires options and a custom command', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);

  definition.name = {
    options: [],
    content: ['id_board_variant', 0, 5],
  };
  expect(() => validateKeyboardDefinitionV3(definition)).toThrow();

  definition.name = {
    options: ['Default Board'],
    content: ['id_board_variant', 0],
  };
  expect(() => validateKeyboardDefinitionV3(definition)).toThrow();
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

test('constraints are accepted only on ranges', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);
  const controls = definition.menus[0].content[0].content;

  controls[0].constraints = [
    {
      operator: '>=',
      reference: 'id_effect_speed',
      offset: 1,
      onViolation: 'clamp',
    },
  ];
  expect(() => validateKeyboardDefinitionV3(definition)).not.toThrow();

  controls[1].constraints = controls[0].constraints;
  expect(() => validateKeyboardDefinitionV3(definition)).toThrow();
});

test('constraints reject unsupported operators and behaviors', async () => {
  const validDefinitionJson = await fs.promises.readFile(
    './test/data/v3_valid_definition.json',
    'utf-8'
  );
  const definition = JSON.parse(validDefinitionJson);
  const range = definition.menus[0].content[0].content[0];

  range.constraints = [
    {
      operator: '==',
      reference: 'id_effect_speed'
    }
  ];
  expect(() => validateKeyboardDefinitionV3(definition)).toThrow();

  range.constraints[0].operator = '>=';
  range.constraints[0].onViolation = 'ignore';
  expect(() => validateKeyboardDefinitionV3(definition)).toThrow();
});
