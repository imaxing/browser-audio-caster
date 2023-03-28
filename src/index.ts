export interface BrowserBroadcastProps {
  src: string
  crossorigin?: string
  speed?: number
  autoPlay?: boolean
  muted?: boolean
  startTime?: number
  waiting?: number
  onCanplay?: (format: string, hours?: number, minutes?: number, seconds?: number) => void
  onEnd?: () => void
  onPlaySuccess: () => void
  onPlayFail: (e: any) => void
  onTimeUpdate?: (data: {
    progress: number
    total: string
    seconds: number
    minutes: number
    hours: number
    format: string
  }) => void
}

const padZero = (value: number): string | number => (value < 10 ? `0${value}` : value)

export default ({
  src,
  crossorigin,
  speed = 1,
  autoPlay = false,
  muted = false,
  startTime = 0,
  waiting = 0,
  onCanplay,
  onEnd,
  onPlaySuccess,
  onPlayFail,
  onTimeUpdate
}: BrowserBroadcastProps): HTMLAudioElement | null => {
  const audio = new Audio(src)

  audio.playbackRate = speed
  audio.autoplay = autoPlay
  audio.muted = muted
  audio.currentTime = startTime
  crossorigin && (audio.crossOrigin = crossorigin)

  let total = ''

  setTimeout(() => audio.play().catch(onPlayFail), waiting)

  audio.addEventListener('canplay', () => {
    const hours = Math.floor(audio.duration / 3600)
    const minutes = Math.floor((audio.duration % 3600) / 60)
    const seconds = Math.floor(audio.duration % 60)
    total = [hours, minutes, seconds].map(padZero).join(':')
    onCanplay?.(total, hours, minutes, seconds)
  })

  onPlaySuccess && audio.addEventListener('play', onPlaySuccess)

  onPlayFail && audio.addEventListener('error', onPlayFail)

  onEnd && audio.addEventListener('ended', onEnd)

  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100
    const hours = Math.floor(audio.currentTime / 3600)
    const minutes = Math.floor((audio.currentTime % 3600) / 60)
    const seconds = Math.floor(audio.currentTime % 60)
    const format = [hours, minutes, seconds].map(padZero).join(':')

    onTimeUpdate?.({ progress, hours, minutes, seconds, format, total })
  })
  return audio
}
