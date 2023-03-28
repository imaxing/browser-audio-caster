export interface BrowserBroadcastProps {
  src: string
  crossorigin?: string
  speed?: number
  autoPlay?: boolean
  muted?: boolean
  startTime?: number
  onCanplay?: (total: Total) => void
  onEnd?: () => void
  onPlaySuccess: () => void
  onPlayFail: (e: any) => void
  onTimeUpdate?: (data: {
    progress: number
    total: Total
    seconds: number
    minutes: number
    hours: number
    format: string
  }) => void
}

export interface Total {
  hours?: number
  minutes?: number
  seconds?: number
  format?: string
}

const padZero = (value: number): string | number => (value < 10 ? `0${value}` : value)

export default (props: BrowserBroadcastProps): HTMLAudioElement | null => {
  const {
    src,
    speed = 1,
    autoPlay = true,
    muted = false,
    startTime = 0,
    crossorigin,
    onCanplay,
    onEnd,
    onTimeUpdate,
    onPlayFail,
    onPlaySuccess
  } = props
  if (!src) return null

  const total: Total = {}
  const audioContext: any = new Audio(src)

  audioContext.playbackRate = speed
  audioContext.muted = muted
  audioContext.autoplay = autoPlay
  audioContext.currentTime = startTime
  audioContext.onended = onEnd
  crossorigin && (audioContext.crossorigin = crossorigin)

  audioContext.load()
  audioContext.oncanplay = (e: any) => {
    const duration = e.target?.duration
    const hours = parseInt(`${(duration / (60 * 60)) % 24}`)
    const minutes = parseInt(`${(duration / 60) % 60}`)
    const seconds = parseInt(`${duration % 60}`)
    total.hours = hours
    total.minutes = minutes
    total.seconds = seconds
    total.format = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
    onCanplay && onCanplay(total)
  }

  audioContext.ontimeupdate = (e: any) => {
    const { currentTime, duration } = e.target
    const seconds = parseInt(`${currentTime % 60}`)
    const minutes = parseInt(`${(currentTime / 60) % 60}`)
    const hours = parseInt(`${(currentTime / (60 * 60)) % 24}`)
    const format = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`

    onTimeUpdate &&
      onTimeUpdate({
        progress: (currentTime / duration) * 100,
        total,
        seconds,
        minutes,
        hours,
        format
      })
  }

  audioContext.addEventListener('canplaythrough', (event: any) => {
    autoPlay && audioContext.play().then(onPlaySuccess).catch(onPlayFail)
  })

  return audioContext
}
