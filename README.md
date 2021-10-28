### KeyWatch

按键观察

#### 安装

> npm i @~crazy/keywatch -S

#### 使用

```javascript
import KeyWatch from '@~crazy/keywatch';

const watch = new KeyWatch();
// 监听
const removeListen = watch.listen('ctrl+c', () => {
    console.log('复制');
    // 返回 true 禁用浏览器默认行为
    return true;
});
// 移除
removeListen();

/**
 * 组合键
 * 先按下 ctrl+k，再按下 ctrl+u
 **/
watch.listen('ctrl+k>ctrl+u', () => {
    console.log('将文本转换为大写');
    return true;
});

// 监听多个
watch.listen(['ctrl+z', 'ctrl+a'], () => {
    console.log('撤销');
});
```

#### 监听文本输入框

```html
<input id="input" />
```

```javascript
const watch = new KeyWatch(document.querySelector('#input'));
// 监听所有按键
watch.listen(event => {
    console.log(`按下了${event.key}`);
});
```

#### 判断
``` javascript
// 是否按下 ctrl 键
console.log(watch.ctrl);
// 是否按下 shift 键
console.log(watch.shift);
// 是否按下 alt 键
console.log(watch.alt);
// 是否按下 meta 键
console.log(watch.meta);

// 判断其他按键
console.log(watch.isPressed('a'));
```