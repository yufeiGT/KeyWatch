import Spanner from '@~crazy/spanner';

import {
    keyMap,
    codeMap,
    keyIndex,
    toKey,
    toCode,
} from './keyMap';

// 按键观察
class KeyWatch {

    /**
     * 
     * @param {HTMLElement/Window} target [监听目标] 
     * @param {Boolean} preventDefault [阻止浏览器默认行为]
     */
    constructor(target, preventDefault = false) {
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
            const combination = this.#checkCombinationKey(key);
            if (this.#trigger(combination, new KeyboardEvent(this.#downKeys.length > 1 ? 'shortcutkey' : 'keydown', {
                ...e,
                key: this.#downKeys.map(item => codeMap[item]).join('+'),
                code: key,
                ctrlKey: false,
                shiftKey: false,
                altKey: false,
                metaKey: false,
                view: e.view,
            })) || (combination && preventDefault)) e.preventDefault();
            const {
                has,
                idList,
            } = this.#checkKeyPath(this.#keyPath);
            if ((has && !idList) || this.#trigger(idList, new KeyboardEvent('combinationkey', {
                ...e,
                key: this.#keyPath.map(item => item.split(/\+/).map(item => codeMap[item]).join('+')).join('>'),
                code: this.#keyPath.join('>'),
                ctrlKey: false,
                shiftKey: false,
                altKey: false,
                metaKey: false,
                view: e.view,
            })) || (idList && preventDefault)) e.preventDefault();
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

    #id = Spanner.createID();
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
        const id = Spanner.createID();
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
        if (!Spanner.isObject(path)) {
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
        if (!Spanner.isObject(path)) {
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

    
    static toKey = toKey;

    static toCode = toCode;

}

export default KeyWatch;