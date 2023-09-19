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
  onPlay,
  onError,
  onTimeUpdate
})
```

#### Props

| 参数名       | 说明                                               | 默认值 |
| ------------ | -------------------------------------------------- | ------ |
| src          | mp3 地址                                           | -      |
| speed        | 播报速度                                           | 1      |
| muted        | 是否静音                                           | false  |
| startTime    | 开始时间                                           | 0      |
| waiting      | 延迟播报时间                                       | 0      |
| autoPlay     | 是否直接播报, 设为 false 需要使用返回值调用 play() | true   |
| onCanplay    | on canplay                                         | -      |
| onEnd        | on end                                             | -      |
| onPlay       | on play                                            | -      |
| onError      | on error                                           | -      |
| onTimeUpdate | on update                                          | -      |

#### Live demo

[![Edit browser-audio-caster-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/browser-broadcast-example-d3fq9u?fontsize=14&hidenavigation=1&theme=dark)
