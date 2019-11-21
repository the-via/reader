import Ajv = require('ajv');
import { KeyboardDefinition } from './transform';
export declare const ajv: Ajv.Ajv;
export { KeyboardDefinition };
export declare const KeyboardDefinitionSchema: {
    $schema: string;
    defaultProperties: never[];
    definitions: {
        LightingSupport: {
            enum: string[];
            type: string;
        };
        'Partial<{c:string;t:string;x:number;y:number;w:number;a:number;}>': {
            defaultProperties: never[];
            properties: {
                a: {
                    type: string;
                };
                c: {
                    type: string;
                };
                t: {
                    type: string;
                };
                w: {
                    type: string;
                };
                x: {
                    type: string;
                };
                y: {
                    type: string;
                };
            };
            type: string;
        };
    };
    properties: {
        matrix: {
            properties: {
                cols: {
                    type: string;
                };
                rows: {
                    type: string;
                };
            };
            type: string;
        };
        layouts: {
            additionalProperties: {
                items: {
                    items: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    type: string;
                };
                type: string;
            };
            defaultProperties: never[];
            type: string;
        };
        lighting: {
            $ref: string;
        };
        name: {
            type: string;
        };
        productId: {
            type: string;
        };
        vendorId: {
            type: string;
        };
    };
    required: string[];
    type: string;
};
export declare type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>;
export declare const isKeyboardDefinition: ValidateFunction<KeyboardDefinition>;
export default function validate(value: unknown): KeyboardDefinition;
