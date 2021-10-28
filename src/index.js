const keyMap = {
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

const keyMapReverse = {};
for (let [key, v] of Object.entries(keyMap)) {
    const value = Array.isArray(v) ? v : [v];
    value.forEach(item => {
        if (item in keyMapReverse) {
            if (Array.isArray(keyMapReverse[item])) {
                keyMapReverse[item] = [...keyMapReverse[item], key];
            } else keyMapReverse[item] = [keyMapReverse[item], key];
            return;
        }
        keyMapReverse[item] = key;
    });
}

const keyIndex = {
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

function isObject(obj) {
    return typeof obj == 'object' && !Array.isArray(obj) && obj !== null;
}

function getUUID() {
    let d = new Date().getTime() + performance.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, $1 => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return ($1 == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// 按键观察
class KeyWatch {

    constructor(target) {
        this.#target = target && target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(target.nodeName) ? target : window;
        this.#target.addEventListener('keydown', e => {
            if (this.isGlobal && this.isFocusInput) return;
            const now = performance.now();
            if (!this.#downKeys.filter(item => !['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'MetaLeft', 'MetaRight', 'AltLeft', 'AltRight'].includes(item)).length && now - this.#lastDownTimeStamp > 500) this.#keyPath = [];
            this.#lastDownTimeStamp = now;
            if ('defaults' in this.#keyPathMap) this.#trigger(this.#keyPathMap.defaults, e);
            let key;
            if (!e.repeat) {
                this.#downKeys.push(e.code);
                key = this.#downKeys.join('+');
                if (this.#keyPath.length) {
                    const last = this.#keyPath[this.#keyPath.length - 1];
                    const regexpStr = last.replace('+', '\\+');
                    if (last !== key && new RegExp(`^${regexpStr}`).test(key)) this.#keyPath.pop();
                }
                this.#keyPath.push(key);
            } else key = this.#downKeys.join('+');
            if (this.#trigger(this.#checkCombinationKey(key), new KeyboardEvent(this.#downKeys.length > 1 ? 'shortcutkey' : 'keydown', {
                ...e,
                key: this.#downKeys.map(item => keyMapReverse[item]).join('+'),
                code: key,
                ctrlKey: false,
                shiftKey: false,
                altKey: false,
                metaKey: false,
                view: e.view,
            }))) e.preventDefault();
            const {
                has,
                idList,
            } = this.#checkKeyPath(this.#keyPath);
            if ((has && !idList) || this.#trigger(idList, new KeyboardEvent('combinationkey', {
                ...e,
                key: this.#keyPath.map(item => item.split(/\+/).map(item => keyMapReverse[item]).join('+')).join('>'),
                code: this.#keyPath.join('>'),
                ctrlKey: false,
                shiftKey: false,
                altKey: false,
                metaKey: false,
                view: e.view,
            }))) e.preventDefault();
        });
        this.#target.addEventListener('keyup', e => {
            if (this.isGlobal && this.isFocusInput) return;
            this.#lastDownTimeStamp = performance.now();
            const index = this.#downKeys.indexOf(e.code);
            if (index > -1) this.#downKeys.splice(index, 1);
        });
        this.#target.addEventListener('blur', () => {
            this.#downKeys = [];
            this.#keyPath = [];
        });
    }

    // 按下的按键
    #downKeys = [];
    // 按键路径
    #keyPath = [];
    // 最后按键时间
    #lastDownTimeStamp = performance.now();
    // 事件回调列表
    #eventCallbacks = new Map();
    // 按键路径地图
    #keyPathMap = {};

    #id = getUUID();
    get id() {
        return this.#id;
    }

    // 监听目标
    #target;
    get target() {
        return this.#target;
    }

    // 全局时间
    get isGlobal() {
        return this.#target === window;
    }

    // 焦点在输入框
    get isFocusInput() {
        if (!document) return false;
        const name = document.activeElement.nodeName;
        return name === 'INPUT' || name === 'TEXTAREA';
    }

    get ctrl() {
        return this.isPressed('ctrl');
    }

    get shift() {
        return this.isPressed('shift');
    }

    get alt() {
        return this.isPressed('alt');
    }

    get meta() {
        return this.isPressed('meta');
    }

    isPressed(key) {
        return (Array.isArray(key) ? key : [key]).every(item => {
            const key = keyMap[item] || item;
            return (Array.isArray(key) ? key : [key]).some(item => this.#downKeys.includes(keyMap[item] || item));
        });
    }

    listen(...params) {
        const size = params.length;
        if (!size) return;
        let key = [''];
        let callback;
        if (size > 1) {
            const [k, c] = params;
            key = Array.isArray(k) ? k : [k];
            callback = c;
        } else callback = params[0];
        if (typeof callback !== 'function') return;
        const id = getUUID();
        const paths = key.map(item => {
            const path = KeyWatch.buildKeyPath(item, id);
            this.#appendKeyPath(path);
            return path;
        });
        this.#eventCallbacks.set(id, callback);
        return ((paths, id) => () => {
            paths.forEach(item => this.#removePath(item));
            this.#eventCallbacks.delete(id);
        })(paths, id);
    }

    #appendKeyPath(path, scope = this.#keyPathMap) {
        if (!isObject(path)) {
            if (!('defaults' in scope)) scope.defaults = [];
            scope.defaults.push(path);
            return;
        }
        for (let [key, value] of Object.entries(path)) {
            if (!(key in scope)) scope[key] = {};
            this.#appendKeyPath(value, scope[key]);
        }
    }

    #removePath(path, scope = this.#keyPathMap) {
        if (!isObject(path)) {
            if (!('defaults' in scope)) return;
            const index = scope.defaults.indexOf(path);
            if (index > -1) scope.defaults.splice(index, 1);
            if (!scope.defaults.length) delete scope.defaults;
            return;
        }
        for (let [key, value] of Object.entries(path)) {
            if (!(key in scope)) return;
            this.#removePath(value, scope[key]);
            if (!Object.keys(scope[key]).length) delete scope[key];
        }
    }

    #checkKeyPath(keyPath) {
        if (keyPath.length < 2) return {
            has: keyPath[0] in this.#keyPathMap,
        };
        const size = keyPath.length;
        let target = this.#keyPathMap;
        let index = 0;
        while (target && index < size) {
            target = target[keyPath[index]];
            index++;
        }
        return {
            has: !!target,
            idList: target && target.defaults,
        };
    }

    #checkCombinationKey(key) {
        if (!(key in this.#keyPathMap)) return;
        const target = this.#keyPathMap[key];
        return target && target.defaults;
    }

    #trigger(list, event) {
        if (!list) return;
        return list.map(id => this.#eventCallbacks.get(id)).some(callback => callback(event));
    }

    static buildKeyPath(key, value) {
        if (!key) return value;
        let map = value;
        key.replace(/\s*/g, '').split(/>/).map(item => {
            let keyList = [''];
            item.split(/\+/).forEach(item => {
                const originKey = keyMap[item] || item;
                if (Array.isArray(originKey)) {
                    const temp = [...keyList];
                    keyList = [];
                    originKey.forEach(item => {
                        temp.forEach(t => {
                            keyList.push(`${t}+${item}`)
                        });
                    });
                    return;
                }
                keyList = keyList.map(item => `${item}+${originKey}`);
            });
            return keyList.map(item => item.split(/\+/).filter(item => item).sort((a, b) => KeyWatch.getKeyIndex(b) - KeyWatch.getKeyIndex(a)).join('+'));
        }).reverse().forEach(item => {
            const json = {};
            item.forEach(item => json[item] = map);
            map = json;
        });
        return map;
    }

    static getKeyIndex(key) {
        return keyIndex[key] || 0;
    }

}

export default KeyWatch;