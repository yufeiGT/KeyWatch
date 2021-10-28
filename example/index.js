import '@example/stylesheets/app.css';

import KeyWatch from 'keywatch';

const watch = new KeyWatch();

window.watch = watch;

watch.listen('shift>ctrl+c>ctrl+v', (e) => {
    console.log('shift>ctrl+c>ctrl+v', e);
});

const remove = watch.listen('p>d>x>t', () => {
    console.log('配电系统')
});
// remove();

watch.listen('ctrl+delete', e => {
    console.log(e);
})

watch.listen('ctrl+k>ctrl+u', (e) => {
    console.log('大写', e);
    const p = document.createElement('p');
    p.innerHTML = '大写';
    document.querySelector('#app').appendChild(p);
    return true;
});
watch.listen('ctrl+k>ctrl+u>ctrl+l', () => {
    console.log('大小写');
    return true;
});

watch.listen('ctrl+k>ctrl+l', () => {
    console.log('小写');
    return true;
});

watch.listen('ctrl+c>ctrl+v', (e) => {
    console.log('复制', e);
});
watch.listen('ctrl+v', () => {
    console.log('粘贴');
});
watch.listen(['ctrl+s', 'ctrl+s'], () => {
    console.log('保存');
    return true;
});
watch.listen('↑', () => {
    console.log('上');
    return true;
});

function repaint() {
    if (watch.shift) {
        console.log('左上');
    }
    window.requestAnimationFrame(repaint);
}

repaint();