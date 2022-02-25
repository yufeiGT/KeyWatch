import Spanner from '@~crazy/spanner';

export const keyMap = {
    'esc': 'Escape',
    'f1': 'F1',
    'f2': 'F2',
    'f3': 'F3',
    'f4': 'F4',
    'f5': 'F5',
    'f6': 'F6',
    'f7': 'F7',
    'f8': 'F8',
    'f9': 'F9',
    'f10': 'F10',
    'f11': 'F11',
    'f12': 'F12',
    'scrolllock': 'ScrollLock',
    'printscreen': 'PrintScreen',
    '`': 'Backquote',
    '1': ['Digit1', 'Numpad1'],
    '2': ['Digit2', 'Numpad2'],
    '3': ['Digit3', 'Numpad3'],
    '4': ['Digit4', 'Numpad4'],
    '5': ['Digit5', 'Numpad5'],
    '6': ['Digit6', 'Numpad6'],
    '7': ['Digit7', 'Numpad7'],
    '8': ['Digit8', 'Numpad8'],
    '9': ['Digit9', 'Numpad9'],
    '0': ['Digit0', 'Numpad0'],
    'digit1': 'Digit1',
    'digit2': 'Digit2',
    'digit3': 'Digit3',
    'digit4': 'Digit4',
    'digit5': 'Digit5',
    'digit6': 'Digit6',
    'digit7': 'Digit7',
    'digit8': 'Digit8',
    'digit9': 'Digit9',
    'digit0': 'Digit0',
    '-': ['Minus', 'NumpadSubtract'],
    '=': 'Equal',
    'backspace': 'Backspace',
    'tab': 'Tab',
    'capslock': 'CapsLock',
    'shift': ['ShiftLeft', 'ShiftRight'],
    'ctrl': ['ControlLeft', 'ControlRight'],
    'meta': ['MetaLeft', 'MetaRight'],
    'alt': ['AltLeft', 'AltRight'],
    'space': 'Space',
    'contextmenu': 'ContextMenu',
    'enter': ['Enter', 'NumpadEnter'],
    'a': 'KeyA',
    'b': 'KeyB',
    'c': 'KeyC',
    'd': 'KeyD',
    'e': 'KeyE',
    'f': 'KeyF',
    'g': 'KeyG',
    'h': 'KeyH',
    'i': 'KeyI',
    'j': 'KeyJ',
    'k': 'KeyK',
    'l': 'KeyL',
    'm': 'KeyM',
    'n': 'KeyN',
    'o': 'KeyO',
    'p': 'KeyP',
    'q': 'KeyQ',
    'r': 'KeyR',
    's': 'KeyS',
    't': 'KeyT',
    'u': 'KeyU',
    'v': 'KeyV',
    'w': 'KeyW',
    'x': 'KeyX',
    'y': 'KeyY',
    'z': 'KeyZ',
    '[': 'BracketLeft',
    ']': 'BracketRight',
    '\\': 'Backslash',
    ';': 'Semicolon',
    '\'': 'Quote',
    ',': 'Comma',
    '.': ['Period', 'NumpadDecimal'],
    '/': ['Slash', 'NumpadDivide'],
    'up': 'ArrowUp',
    'right': 'ArrowRight',
    'down': 'ArrowDown',
    'left': 'ArrowLeft',
    '↑': 'ArrowUp',
    '→': 'ArrowRight',
    '↓': 'ArrowDown',
    '←': 'ArrowLeft',
    'pause': 'Pause',
    'insert': 'Insert',
    'home': 'Home',
    'end': 'End',
    'delete': 'Delete',
    'pageup': 'PageUp',
    'pagedown': 'PageDown',
    'numlock': 'NumLock',
    'numpaddivide': 'NumpadDivide',
    '*': 'NumpadMultiply',
    'numpadmultiply': 'NumpadMultiply',
    'numpadsubtract': 'NumpadSubtract',
    '+': 'NumpadAdd',
    'numpadadd': 'NumpadAdd',
    'numpadenter': 'NumpadEnter',
    'numpaddecimal': 'NumpadDecimal',
    'numpad1': 'Numpad1',
    'numpad2': 'Numpad2',
    'numpad3': 'Numpad3',
    'numpad4': 'Numpad4',
    'numpad5': 'Numpad5',
    'numpad6': 'Numpad6',
    'numpad7': 'Numpad7',
    'numpad8': 'Numpad8',
    'numpad9': 'Numpad9',
    'numpad0': 'Numpad0',
};

const _codeMap = {};
for (let [key, v] of Object.entries(keyMap)) {
    const value = Spanner.isArray(v) ? v : [v];
    value.forEach(item => {
        if (item in _codeMap) {
            if (Array.isArray(_codeMap[item])) {
                _codeMap[item] = [..._codeMap[item], key];
            } else _codeMap[item] = [_codeMap[item], key];
            return;
        }
        _codeMap[item] = key;
    });
}

export const codeMap = _codeMap;

export const keyIndex = {
    'ctrl': 4,
    'ControlLeft': 4,
    'ControlRight': 4,
    'shift': 3,
    'ShiftLeft': 3,
    'ShiftRight': 3,
    'alt': 2,
    'MetaLeft': 2,
    'MetaRight': 2,
    'meta': 1,
    'MetaLeft': 1,
    'MetaRight': 1,
};

export function toKey(code, callback) {
    if (!(code in keyMap)) return;
    const key = keyMap[code];
    if (Spanner.isFunction(callback)) {
        (Spanner.isArray(key) ? key : [key]).forEach(item => callback(item));
    }
    return key;
}

export function toCode(key, callback) {
    if (!(key in codeMap)) return;
    const code = codeMap[key];
    if (Spanner.isFunction(callback)) {
        (Spanner.isArray(code) ? code : [code]).forEach(item => callback(item));
    }
    return code;
}