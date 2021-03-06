/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

import * as s from './styles'
import { useFavouriteStore, useMovieStore, useWatchLaterStore } from 'store'
import Arrow from 'components/Arrow'
import Star from 'components/Star'
import slugify from 'slugify'

const MoviePopup = () => {
  const favourite = useFavouriteStore((state) => ({
    setFavourite: state.setItems,
    isFavourite: state.isItem
  }))
  const watchLater = useWatchLaterStore((state) => ({
    setWatchLater: state.setItems,
    isWatchLater: state.isItem
  }))
  const movie = useMovieStore((state) => state.movie)
  const removeMovie = useMovieStore((state) => state.removeMovie)

  const handleFavouriteClick = () => {
    favourite.setFavourite(
      {
        id: movie!.id,
        name: movie!.name,
        img: movie!.img,
        overview: movie!.overview
      },
      'favourites'
    )
  }

  const handleWatchLaterClick = () => {
    watchLater.setWatchLater(
      {
        id: movie!.id,
        name: movie!.name,
        img: movie!.img,
        overview: movie!.overview
      },
      'watchLater'
    )
  }

  const handleCloseClick = () => {
    document.querySelector('body')!.style.overflow = 'auto'
    removeMovie()
  }

  return (
    <s.Wrapper isOpen={!!movie} aria-hidden={!movie}>
      {movie && (
        <>
          <s.Overlay
            onClick={handleCloseClick}
            title="Click to close"
            aria-label="Click to close"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <s.Content>
            <button
              onClick={handleCloseClick}
              title="Click to close icon"
              aria-label="Click to close icon"
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                aria-label="Close icon"
              >
                <path
                  d="M1 1l7.25 7.25 7.25 7.25M15.5 1L8.25 8.25 1 15.5"
                  stroke="#F8F8F2"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <s.TopWrapper>
              <s.LeftWrapper>
                <img
                  src={movie.img}
                  alt={movie.name}
                  width={200}
                  height={287}
                />
                <s.IconsWrapper
                  watchLater={watchLater.isWatchLater(movie.id)}
                  favourite={favourite.isFavourite(movie.id)}
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
              </s.LeftWrapper>
              <s.TextWrapper>
                <h2>{movie.name}</h2>
                <h3>{movie.overview}</h3>
                <button>
                  <Link href={`/${movie.id}/${slugify(movie.name)}`} passHref>
                    <a>{`go to movie's page`}</a>
                  </Link>
                </button>
              </s.TextWrapper>
            </s.TopWrapper>
            {movie.video && (
              <s.VideoWrapper>
                <iframe
                  width="430"
                  height="287"
                  src={`https://www.youtube.com/embed/${movie.video}`}
                  title="Movie video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  aria-label={`${movie.name} trailer`}
                ></iframe>
              </s.VideoWrapper>
            )}
          </s.Content>
        </>
      )}
    </s.Wrapper>
  )
}
export default MoviePopup
