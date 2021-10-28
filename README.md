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