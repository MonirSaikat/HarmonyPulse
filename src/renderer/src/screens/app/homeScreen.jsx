import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const env = await import.meta.env

const API_KEY = env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

const getChannelId = async (channelName) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: channelName,
        type: 'channel',
        key: API_KEY,
        maxResults: 1
      }
    })

    const channel = response.data.items[0] // Assuming the first result is the correct channel
    return channel.id.channelId
  } catch (error) {
    console.error('Error fetching channel ID:', error)
    throw error
  }
}

const fetchVideos = async (channelName = 'derek banas') => {
  try {
    const channelId = await getChannelId(channelName)

    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        channelId: channelId,
        key: API_KEY,
        // videoDuration: 'medium',
        maxResults: 32,
        order: 'date' // date | viewCount
      }
    })

    return response.data.items
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error
  }
}

const HomeScreenStyled = styled.div`
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const Channels = styled.div`
  display: flex;
  justify-content: space-around;

  div {
    button {
      min-width: 100%;
      text-overflow: ellipsis;
      background: var(--primary-color);
      color: var(--light-color);
      padding: 5px;
    }
  }
`

const VideoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
`

const ImageBox = styled.img`
  width: 100%;
`

export const HomeScreen = () => {
  const [channels] = useState([
    'Traversy Media',
    'Derek Banas',
    'FreeCodeCamp',
    'Web Deve Simplified',
    'Laravel Daily',
    'Fireship',
    'Coding Garden',
    'codeSTACKr',
    'The New Boston',
    'LevelUpTuts',
    'Fun Fun Function',
    'Kevin Powell',
    'Forrest Knight',
    'Andy Sterkowitz'
  ])

  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  const _fetchVideos = (channel) => {
    fetchVideos(channel).then((_videos) => {
      setVideos(_videos)
    })
  }

  useEffect(() => {
    _fetchVideos(channels[0])
  }, [])

  const handleImageClick = (videoId) => {
    navigate('/' + videoId)
  }

  return (
    <HomeScreenStyled>
      <Channels>
        {channels.map((ch) => (
          <div key={ch}>
            <button onClick={() => _fetchVideos(ch)}>{ch}</button>
          </div>
        ))}
      </Channels>

      <VideoBoxes>
        {videos.map((v) => (
          <ImageBox
            key={v.etag}
            src={v.snippet.thumbnails.high.url}
            onClick={() => handleImageClick(v.id.videoId)}
          />
        ))}
      </VideoBoxes>
    </HomeScreenStyled>
  )
}
