import Ajv = require('ajv');
import KeyboardDefinitionV2 from './keyboard-definition-v2';
export declare const ajv: Ajv.Ajv;
export { KeyboardDefinitionV2 };
export declare const KeyboardDefinitionV2Schema: {
    $schema: string;
    defaultProperties: never[];
    definitions: {
        LightingValue: {
            enum: number[];
            type: string;
        };
        LightingTypeDefinition: {
            enum: string[];
            type: string;
        };
        'Partial<VIALightingTypeDefinition>': {
            defaultProperties: never[];
            properties: {
                effects: {
                    items: {
                        additionalItems: {
                            anyOf: {
                                type: string;
                            }[];
                        };
                        items: {
                            type: string;
                        }[];
                        minItems: number;
                        type: string;
                    };
                    type: string;
                };
                keycodes: {
                    enum: string[];
                    type: string;
                };
                supportedLightingValues: {
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
            };
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
        customFeatures: {
            items: {
                enum: string[];
                type: string;
            };
            type: string;
        };
        customKeycodes: {
            items: {
                defaultProperties: never[];
                properties: {
                    name: {
                        type: string;
                    };
                    shortName: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                };
                required: string[];
                type: string;
            };
            type: string;
        };
        layouts: {
            defaultProperties: never[];
            properties: {
                keymap: {
                    items: {
                        anyOf: ({
                            defaultProperties: never[];
                            properties: {
                                name: {
                                    type: string;
                                };
                            };
                            type: string;
                            items?: undefined;
                        } | {
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
                            defaultProperties?: undefined;
                            properties?: undefined;
                        })[];
                    };
                    type: string;
                };
                labels: {
                    items: {
                        anyOf: ({
                            items: {
                                type: string;
                            };
                            type: string;
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    type: string;
                };
                presets: {
                    additionalProperties: {
                        items: {
                            type: string;
                        };
                        type: string;
                    };
                    defaultProperties: never[];
                    type: string;
                };
            };
            required: string[];
            type: string;
        };
        lighting: {
            anyOf: ({
                allOf: ({
                    $ref: string;
                    defaultProperties?: undefined;
                    properties?: undefined;
                    required?: undefined;
                    type?: undefined;
                } | {
                    defaultProperties: never[];
                    properties: {
                        extends: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    type: string;
                    $ref?: undefined;
                })[];
                enum?: undefined;
                type?: undefined;
            } | {
                enum: string[];
                type: string;
                allOf?: undefined;
            })[];
        };
        matrix: {
            defaultProperties: never[];
            properties: {
                cols: {
                    type: string;
                };
                rows: {
                    type: string;
                };
            };
            required: string[];
            type: string;
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
export declare const isKeyboardDefinitionV2: ValidateFunction<KeyboardDefinitionV2>;
export default function validate(value: unknown): KeyboardDefinitionV2;
