# browser-audio-caster

> 浏览器播报音频工具函数

#### Installtion

```bash
npm i browser-audio-caster
```

#### Usage

```js
import bac from 'browser-audio-caster'

bac({
  src,
  speed,
  muted,
  onCanplay,
  onEnd,
  onTimeUpdate,
  startTime,
  autoPlay
})
```

#### Props

| 参数名       | 说明         | 默认值 |
| ------------ | ------------ | ------ |
| src          | mp3 地址     | -      |
| speed        | 播报速度     | 1      |
| muted        | 是否静音     | false  |
| startTime    | 开始播报时间 | 0      |
| autoPlay     | 是否直接播报 | true   |
| onCanplay    | 可以播报回调 | -      |
| onEnd        | 播报结束回调 | -      |
| onTimeUpdate | 播报进度回调 | -      |

#### Live demo

[![Edit browser-audio-caster-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/browser-broadcast-example-d3fq9u?fontsize=14&hidenavigation=1&theme=dark)
