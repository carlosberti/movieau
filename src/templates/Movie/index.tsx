import { useRouter } from 'next/router'
import { useEffect } from 'react'
import slugify from 'slugify'
import { NextSeo } from 'next-seo'

import Arrow from 'components/Arrow'
import BannerSlider from 'components/BannerSlider'
import { Container } from 'components/Container'
import MovieInfos from 'components/MovieInfos'
import Star from 'components/Star'
import { useFavouriteStore, useMovieStore, useWatchLaterStore } from 'store'
import Base from 'templates/Base'
import * as s from './styles'

type ImagesResponse = {
  file_path: string
}

type VideosResponse = {
  key: string
  site: string
  type: string
}

export type MovieTemplateProps = {
  id: number
  name: string
  overview: string
  images: ImagesResponse[]
  videos: VideosResponse[]
  watchProviders: string[]
  companies: string[]
  poster_path: string
}

const Movie = ({
  id,
  name,
  overview,
  videos,
  images,
  watchProviders,
  companies,
  poster_path
}: MovieTemplateProps) => {
  const router = useRouter()
  const favourite = useFavouriteStore((state) => ({
    setFavourite: state.setItems,
    isFavourite: state.isItem,
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen
  }))
  const watchLater = useWatchLaterStore((state) => ({
    setWatchLater: state.setItems,
    isWatchLater: state.isItem,
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen
  }))
  const removeMovie = useMovieStore((state) => state.removeMovie)

  const handleFavouriteClick = () => {
    favourite.setFavourite(
      { id, img: poster_path, name, overview },
      'favourites'
    )
  }

  const handleWatchLaterClick = () => {
    watchLater.setWatchLater(
      { id, img: poster_path, name, overview },
      'watchLater'
    )
  }

  useEffect(() => {
    if (name) {
      const movieSlug = slugify(name)

      if (router.pathname.split('/')[2] !== movieSlug) {
        router.push(`/${id}/${movieSlug}`, undefined, { shallow: true })
      }
    }
  }, [router.isFallback])

  useEffect(() => {
    document.querySelector('body')!.style.overflow = 'auto'
    removeMovie()
    favourite.isOpen && favourite.setIsOpen()
    watchLater.isOpen && watchLater.setIsOpen()
  }, [])

  if (router.isFallback) {
    return <div>loading...</div>
  }

  const concatImagesAndVideos = () => {
    const video = videos.flatMap((video) =>
      video.site === 'YouTube' ? [video.key] : []
    )
    const image = images.map(
      (image) => `https://image.tmdb.org/t/p/original/${image.file_path}`
    )

    return image.slice(0, 3).concat(video.slice(0, 3))
  }

  return (
    <>
      <NextSeo
        title={name}
        description={overview?.slice(0, 30) || 'A amazing movie!'}
        openGraph={{
          url: `https://movieau.carlosberti.dev/${id}/${slugify(name)}`,
          images: [
            {
              url: concatImagesAndVideos()[0],
              width: 1920,
              height: 1080,
              alt: name
            }
          ]
        }}
      />
      <Base>
        <BannerSlider name={name} path={concatImagesAndVideos()} />
        <Container>
          <s.Content>
            <s.TextWrapper>
              <div>
                <h1>{name}</h1>
                <s.IconsWrapper
                  watchLater={watchLater.isWatchLater(id)}
                  favourite={favourite.isFavourite(id)}
                >
                  <button
                    onClick={handleFavouriteClick}
                    title="Click to favourite"
                    aria-label="Click to favourite"
                  >
                    <Star />
                  </button>
                  <button
                    onClick={handleWatchLaterClick}
                    title="Click to watch later"
                    aria-label="Click to watch later"
                  >
                    <Arrow />
                  </button>
                </s.IconsWrapper>
              </div>
              <h2>{overview}</h2>
            </s.TextWrapper>
            <s.MovieInfos>
              <div>
                <MovieInfos
                  title="You can watch on:"
                  color="#FF80BF"
                  items={watchProviders}
                  notFoundMessage="no players found"
                />
              </div>
              <div>
                <MovieInfos
                  title="Production companies:"
                  color="#FFCA80"
                  items={companies}
                  notFoundMessage="no companies found"
                />
              </div>
            </s.MovieInfos>
          </s.Content>
        </Container>
      </Base>
    </>
  )
}
export default Movie
