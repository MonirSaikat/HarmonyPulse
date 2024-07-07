import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'

export const VideoDetails = () => {
  const params = useParams()

  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${params.videoId}`}
        width={'100vw'}
        height={'calc(100vh - var(--navbar-height) * 1.599)'}
        loop
        playing
        config={{
          youtube: {
            playerVars: { showinfo: 0 }
          }
        }}
      />
    </div>
  )
}
