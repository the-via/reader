"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
exports.LightingPreset = (_a = {},
    _a[types_1.LightingTypeDefinition.None] = {
        effects: [],
        underglowEffects: [],
        keycodes: types_1.KeycodeType.None,
        supportedLightingValues: []
    },
    _a[types_1.LightingTypeDefinition.QMKLighting] = {
        effects: [
            ['Off', 0],
            ['On', 0]
        ],
        underglowEffects: [],
        keycodes: types_1.KeycodeType.QMK,
        supportedLightingValues: [
            types_1.LightingValue.BACKLIGHT_BRIGHTNESS,
            types_1.LightingValue.BACKLIGHT_EFFECT
        ]
    },
    _a[types_1.LightingTypeDefinition.QMKBacklightRGBLight] = {
        effects: [
            ['Off', 0],
            ['On', 0]
        ],
        underglowEffects: [
            ['All Off', 0],
            ['Solid Color', 1],
            ['Breathing 1', 1],
            ['Breathing 2', 1],
            ['Breathing 3', 1],
            ['Breathing 4', 1],
            ['Rainbow Mood 1', 0],
            ['Rainbow Mood 2', 0],
            ['Rainbow Mood 3', 0],
            ['Rainbow Swirl 1', 0],
            ['Rainbow Swirl 2', 0],
            ['Rainbow Swirl 3', 0],
            ['Rainbow Swirl 4', 0],
            ['Rainbow Swirl 5', 0],
            ['Rainbow Swirl 6', 0],
            ['Snake 1', 1],
            ['Snake 2', 1],
            ['Snake 3', 1],
            ['Snake 4', 1],
            ['Snake 5', 1],
            ['Snake 6', 1],
            ['Knight 1', 1],
            ['Knight 2', 1],
            ['Knight 3', 1],
            ['Christmas', 1],
            ['Gradient 1', 1],
            ['Gradient 2', 1],
            ['Gradient 3', 1],
            ['Gradient 4', 1],
            ['Gradient 5', 1],
            ['Gradient 6', 1],
            ['Gradient 7', 1],
            ['Gradient 8', 1],
            ['Gradient 9', 1],
            ['Gradient 10', 1],
            ['RGB Test', 1],
            ['Alternating', 1]
        ],
        keycodes: types_1.KeycodeType.QMK,
        supportedLightingValues: [
            types_1.LightingValue.BACKLIGHT_BRIGHTNESS,
            types_1.LightingValue.BACKLIGHT_EFFECT,
            types_1.LightingValue.QMK_RGBLIGHT_BRIGHTNESS,
            types_1.LightingValue.QMK_RGBLIGHT_EFFECT,
            types_1.LightingValue.QMK_RGBLIGHT_EFFECT_SPEED,
            types_1.LightingValue.QMK_RGBLIGHT_COLOR
        ]
    },
    _a[types_1.LightingTypeDefinition.QMKRGBLight] = {
        effects: [],
        underglowEffects: [
            ['All Off', 0],
            ['Solid Color', 1],
            ['Breathing 1', 1],
            ['Breathing 2', 1],
            ['Breathing 3', 1],
            ['Breathing 4', 1],
            ['Rainbow Mood 1', 0],
            ['Rainbow Mood 2', 0],
            ['Rainbow Mood 3', 0],
            ['Rainbow Swirl 1', 0],
            ['Rainbow Swirl 2', 0],
            ['Rainbow Swirl 3', 0],
            ['Rainbow Swirl 4', 0],
            ['Rainbow Swirl 5', 0],
            ['Rainbow Swirl 6', 0],
            ['Snake 1', 1],
            ['Snake 2', 1],
            ['Snake 3', 1],
            ['Snake 4', 1],
            ['Snake 5', 1],
            ['Snake 6', 1],
            ['Knight 1', 1],
            ['Knight 2', 1],
            ['Knight 3', 1],
            ['Christmas', 1],
            ['Gradient 1', 1],
            ['Gradient 2', 1],
            ['Gradient 3', 1],
            ['Gradient 4', 1],
            ['Gradient 5', 1],
            ['Gradient 6', 1],
            ['Gradient 7', 1],
            ['Gradient 8', 1],
            ['Gradient 9', 1],
            ['Gradient 10', 1],
            ['RGB Test', 1],
            ['Alternating', 1]
        ],
        keycodes: types_1.KeycodeType.QMK,
        supportedLightingValues: [
            types_1.LightingValue.QMK_RGBLIGHT_BRIGHTNESS,
            types_1.LightingValue.QMK_RGBLIGHT_EFFECT,
            types_1.LightingValue.QMK_RGBLIGHT_EFFECT_SPEED,
            types_1.LightingValue.QMK_RGBLIGHT_COLOR
        ]
    },
    _a[types_1.LightingTypeDefinition.WTMonoBacklight] = {
        effects: [
            ['All Off', 0],
            ['All On', 0],
            ['Raindrops', 0]
        ],
        underglowEffects: [],
        keycodes: types_1.KeycodeType.WT,
        supportedLightingValues: [
            types_1.LightingValue.BACKLIGHT_BRIGHTNESS,
            types_1.LightingValue.BACKLIGHT_EFFECT,
            types_1.LightingValue.BACKLIGHT_EFFECT_SPEED,
            types_1.LightingValue.BACKLIGHT_DISABLE_AFTER_TIMEOUT,
            types_1.LightingValue.BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED
        ]
    },
    _a[types_1.LightingTypeDefinition.WTRGBBacklight] = {
        effects: [
            ['All Off', 0],
            ['Solid Color 1', 1],
            ['Alphas/Mods Color 1/2', 2],
            ['Gradient Vertical Color 1/2', 2],
            ['Raindrops Color 1/2', 2],
            ['Cycle All', 0],
            ['Cycle Horizontal', 0],
            ['Cycle Vertical', 0],
            ['Jellybean Raindrops', 0],
            ['Radial All Hues', 0],
            ['Radial Color 1', 1]
        ],
        underglowEffects: [],
        keycodes: types_1.KeycodeType.WT,
        supportedLightingValues: [
            types_1.LightingValue.BACKLIGHT_BRIGHTNESS,
            types_1.LightingValue.BACKLIGHT_EFFECT,
            types_1.LightingValue.BACKLIGHT_EFFECT_SPEED,
            types_1.LightingValue.BACKLIGHT_DISABLE_AFTER_TIMEOUT,
            types_1.LightingValue.BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED,
            types_1.LightingValue.BACKLIGHT_COLOR_1,
            types_1.LightingValue.BACKLIGHT_COLOR_2,
            types_1.LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR,
            types_1.LightingValue.BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL,
            types_1.LightingValue.BACKLIGHT_LAYER_1_INDICATOR_COLOR,
            types_1.LightingValue.BACKLIGHT_LAYER_1_INDICATOR_ROW_COL,
            types_1.LightingValue.BACKLIGHT_LAYER_2_INDICATOR_COLOR,
            types_1.LightingValue.BACKLIGHT_LAYER_2_INDICATOR_ROW_COL,
            types_1.LightingValue.BACKLIGHT_LAYER_3_INDICATOR_COLOR,
            types_1.LightingValue.BACKLIGHT_LAYER_3_INDICATOR_ROW_COL
        ]
    },
    _a);
