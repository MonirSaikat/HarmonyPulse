import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'

export const VideoDetails = () => {
  const params = useParams()

  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${params.videoId}`}
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
