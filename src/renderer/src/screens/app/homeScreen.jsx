import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const env = await import.meta.env

const API_KEY = env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

const fetchVideos = async (query = 'derek banas') => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        maxResults: 20,
        order: 'viewCount' // date | viewCount
      }
    })
    return response.data.items
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error
  }
}

const HomeScreenStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const ImageBox = styled.img`
  width: 100%;
`

export const HomeScreen = () => {
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchVideos().then((_videos) => {
      console.log(_videos)
      setVideos(_videos)
    })
  }, [])

  const handleImageClick = (videoId) => {
    navigate('/' + videoId)
  }

  return (
    <HomeScreenStyled>
      {videos.map((v) => (
        <ImageBox
          key={v.etag}
          src={v.snippet.thumbnails.high.url}
          onClick={() => handleImageClick(v.id.videoId)}
        />
      ))}
    </HomeScreenStyled>
  )
}
