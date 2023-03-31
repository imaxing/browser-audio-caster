# browser-audio-caster

> 浏览器播报音频工具函数

#### Installtion

```bash
npm i browser-audio-caster
```

#### Usage

```js
import play from 'browser-audio-caster'

play({
  src,
  speed,
  muted,
  waiting,
  startTime,
  autoPlay,
  onCanplay,
  onEnd,
  onTimeUpdate
})
```

#### Props

| 参数名        | 说明                             | 默认值 |
| ------------- | -------------------------------- | ------ |
| src           | mp3 地址                         | -      |
| speed         | 播报速度                         | 1      |
| muted         | 是否静音                         | false  |
| startTime     | 开始播报时间                     | 0      |
| waiting       | 触发播报等待时间                 | 0      |
| autoPlay      | 是否直接播报                     | true   |
| onCanplay     | 可以播报回调                     | -      |
| onEnd         | 播报结束回调                     | -      |
| onTimeUpdate  | 播报进度回调                     | -      |
| onPlaySuccess | audio.play().then(onPlaySuccess) | -      |
| onPlayFail    | audio.play().catch(onPlayFail)   | -      |

#### Live demo

[![Edit browser-audio-caster-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/browser-broadcast-example-d3fq9u?fontsize=14&hidenavigation=1&theme=dark)
