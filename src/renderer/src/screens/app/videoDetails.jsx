import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const VideoConfig = styled.div``

const Top = styled.div`
  padding: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
`

export const VideoDetails = () => {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const ref = useRef()
  const [played, setPlayed] = useState(ref?.current?.getCurrentTime() || 0)

  const params = useParams()

  let duration = moment.duration(played, 'seconds')

  return (
    <div onContextMenu={(e) => false}>
      <ReactPlayer
        ref={ref}
        url={`https://www.youtube.com/watch?v=${params.videoId}`}
        width={'100vw'}
        height={'calc(80vh - var(--navbar-height) * 1.599)'}
        playing={playing}
        muted={muted}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        loop
        volume={volume}
        onProgress={(what) => setPlayed(what.playedSeconds)}
        config={{
          youtube: {
            playerVars: { showinfo: 0 }
          }
        }}
      />

      <VideoConfig>
        <Top>
          <span>{moment.utc(duration.asMilliseconds()).format('m:ss')}</span>
          <input
            style={{ width: '100%' }}
            type="range"
            value={played}
            max={ref?.current?.getDuration()}
            step={ref?.current?.getDuration() / 100 || 0}
            onInput={(e) => ref?.current?.seekTo(e.target.value, 'seconds')}
          />
          <span>
            {ref?.current?.getDuration() ? moment.utc(
              moment.duration(ref?.current?.getDuration(), 'seconds').asMilliseconds()
            ).format('mm:ss') : ''}
          </span>
        </Top>

        <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>

        <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>

        <input type="range" value={volume * 100} onInput={(e) => setVolume(e.target.value / 100)} />
      </VideoConfig>
    </div>
  )
}
