import Ajv = require('ajv');
import VIADefinitionV2 from './via-definition-v2';
export declare const ajv: Ajv.Ajv;
export { VIADefinitionV2 };
export declare const VIADefinitionV2Schema: {
    $schema: string;
    defaultProperties: never[];
    definitions: {
        LightingValue: {
            enum: number[];
            type: string;
        };
        KeyColorType: {
            enum: string[];
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
        'Pick<Result,"h"|"w"|"x2"|"y2"|"h2"|"w2"|"x"|"y"|"r"|"rx"|"ry"|"row"|"col">': {
            defaultProperties: never[];
            properties: {
                col: {
                    type: string;
                };
                h: {
                    type: string;
                };
                h2: {
                    type: string;
                };
                r: {
                    type: string;
                };
                row: {
                    type: string;
                };
                rx: {
                    type: string;
                };
                ry: {
                    type: string;
                };
                w: {
                    type: string;
                };
                w2: {
                    type: string;
                };
                x: {
                    type: string;
                };
                x2: {
                    type: string;
                };
                y: {
                    type: string;
                };
                y2: {
                    type: string;
                };
            };
            required: string[];
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
                height: {
                    type: string;
                };
                keys: {
                    items: {
                        allOf: ({
                            $ref: string;
                            defaultProperties?: undefined;
                            properties?: undefined;
                            required?: undefined;
                            type?: undefined;
                        } | {
                            defaultProperties: never[];
                            properties: {
                                color: {
                                    $ref: string;
                                };
                            };
                            required: string[];
                            type: string;
                            $ref?: undefined;
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
                optionKeys: {
                    additionalProperties: {
                        additionalProperties: {
                            items: {
                                allOf: ({
                                    $ref: string;
                                    defaultProperties?: undefined;
                                    properties?: undefined;
                                    required?: undefined;
                                    type?: undefined;
                                } | {
                                    defaultProperties: never[];
                                    properties: {
                                        color: {
                                            $ref: string;
                                        };
                                    };
                                    required: string[];
                                    type: string;
                                    $ref?: undefined;
                                })[];
                            };
                            type: string;
                        };
                        defaultProperties: never[];
                        type: string;
                    };
                    defaultProperties: never[];
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
                width: {
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
        vendorProductId: {
            type: string;
        };
    };
    required: string[];
    type: string;
};
export declare type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>;
export declare const isVIADefinitionV2: ValidateFunction<VIADefinitionV2>;
export default function validate(value: unknown): VIADefinitionV2;
