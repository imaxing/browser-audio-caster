export interface AudioState {
  format: string
  hours: number
  minutes: number
  progress: number
  seconds: number
  duration: number
  currentTime: number
  total: string
}
export interface BrowserBroadcastProps {
  src: string
  crossorigin?: string
  speed?: number
  context?: HTMLAudioElement
  autoPlay?: boolean
  muted?: boolean
  startTime?: number
  waiting?: number
  onCanplay?: (data: AudioState) => void
  onEnd?: () => void
  onPlay?: () => void
  onError?: (e: any) => void
  onTimeUpdate?: (data: AudioState) => void
}

const padZero = (value: number): string | number => (value < 10 ? `0${value}` : value)

export default ({
  src,
  crossorigin,
  context,
  speed = 1,
  autoPlay = false,
  muted = false,
  startTime = 0,
  waiting = 0,
  onCanplay,
  onEnd,
  onPlay,
  onError,
  onTimeUpdate
}: BrowserBroadcastProps): HTMLAudioElement | null => {
  const audio = context || new Audio(src)
  audio.src = src
  audio.playbackRate = speed
  audio.autoplay = autoPlay
  audio.muted = muted
  audio.currentTime = startTime
  crossorigin && (audio.crossOrigin = crossorigin)

  let total = ''

  setTimeout(() => audio.play().catch(onError), waiting)

  audio.addEventListener('canplay', () => {
    const hours = Math.floor(audio.duration / 3600)
    const minutes = Math.floor((audio.duration % 3600) / 60)
    const seconds = Math.floor(audio.duration % 60)
    total = [hours, minutes, seconds].map(padZero).join(':')
    const format = [hours, minutes, seconds].map(padZero).join(':')
    onCanplay?.({
      progress: 0,
      total,
      hours,
      minutes,
      seconds,
      format,
      duration: audio.duration,
      currentTime: audio.currentTime
    })
  })

  onPlay && audio.addEventListener('play', onPlay)

  onError && audio.addEventListener('error', onError)

  onEnd && audio.addEventListener('ended', onEnd)

  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100
    const hours = Math.floor(audio.currentTime / 3600)
    const minutes = Math.floor((audio.currentTime % 3600) / 60)
    const seconds = Math.floor(audio.currentTime % 60)
    const format = [hours, minutes, seconds].map(padZero).join(':')

    onTimeUpdate?.({
      progress,
      hours,
      minutes,
      seconds,
      format,
      total,
      duration: audio.duration,
      currentTime: audio.currentTime
    })
  })
  return context || audio
}
