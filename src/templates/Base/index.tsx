import { Container } from 'components/Container'
import Logo from 'components/Logo'
import MoviePopup from 'components/MoviePopup'
import SelectionButton from 'components/SelectionButton'
import SelectionModal from 'components/SelectionModal'
import Link from 'next/link'
import { useDarkMode, useFavouriteStore, useWatchLaterStore } from 'store'
import * as s from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseTemplateProps) => {
  const favourites = useFavouriteStore((state) => ({
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen,
    favourite: state.items
  }))

  const watchLater = useWatchLaterStore((state) => ({
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen
  }))

  const darkMode = useDarkMode((state) => state.setDarkMode)

  const handleFavouritesClick = () => {
    favourites.setIsOpen()
  }

  const handleWatchLaterClick = () => {
    watchLater.setIsOpen()
  }

  const handleOnChange = () => {
    darkMode()
  }

  return (
    <s.Wrapper>
      <MoviePopup />
      <s.FloatButtons>
        <SelectionButton
          onClick={handleFavouritesClick}
          buttonText="favourites"
        />
        <SelectionButton
          onClick={handleWatchLaterClick}
          buttonText="watch later"
        />
      </s.FloatButtons>
      <SelectionModal
        title="favourites"
        buttonText="clear favourites"
        store={useFavouriteStore}
      />
      <SelectionModal
        title="watch later"
        buttonText="clear watch later"
        store={useWatchLaterStore}
      />
      <s.Header>
        <Container>
          <Link href="/" passHref>
            <s.LogoWrapper>
              <Logo />
            </s.LogoWrapper>
          </Link>
          <s.THMDBLogo
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 185.04 133.4"
          >
            <defs>
              <linearGradient
                id="a"
                y1="66.7"
                x2="185.04"
                y2="66.7"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#90cea1" />
                <stop offset=".56" stopColor="#3cbec9" />
                <stop offset="1" stopColor="#00b3e5" />
              </linearGradient>
            </defs>
            <g data-name="Layer 2">
              <path
                d="M51.06 66.7A17.67 17.67 0 0168.73 49h-.1A17.67 17.67 0 0186.3 66.7a17.67 17.67 0 01-17.67 17.67h.1A17.67 17.67 0 0151.06 66.7zm82.67-31.33h32.9A17.67 17.67 0 00184.3 17.7 17.67 17.67 0 00166.63 0h-32.9a17.67 17.67 0 00-17.67 17.7 17.67 17.67 0 0017.67 17.67zm-113 98h63.9a17.67 17.67 0 0017.67-17.67A17.67 17.67 0 0084.63 98h-63.9a17.67 17.67 0 00-17.67 17.7 17.67 17.67 0 0017.67 17.67zm83.92-49h6.25L125.5 49h-8.35l-8.9 23.2h-.1L99.4 49h-8.9zm32.45 0h7.8V49h-7.8zm22.2 0h24.95V77.2H167.1V70h15.35v-7.2H167.1v-6.6h16.25V49h-24zM10.1 35.4h7.8V6.9H28V0H0v6.9h10.1zm28.9 0h7.8V20.1h15.1v15.3h7.8V0h-7.8v13.2H46.75V0H39zm41.25 0h25v-7.2H88V21h15.35v-7.2H88V7.2h16.25V0h-24zm-79 49H9V57.25h.1l9 27.15H24l9.3-27.15h.1V84.4h7.8V49H29.45l-8.2 23.1h-.1L13 49H1.2zm112.09 49H126a24.59 24.59 0 007.56-1.15 19.52 19.52 0 006.35-3.37 16.37 16.37 0 004.37-5.5 16.91 16.91 0 001.72-7.58 18.5 18.5 0 00-1.68-8.25 15.1 15.1 0 00-4.52-5.53 18.55 18.55 0 00-6.73-3.02 33.54 33.54 0 00-8.07-1h-11.71zm7.81-28.2h4.6a17.43 17.43 0 014.67.62 11.68 11.68 0 013.88 1.88 9 9 0 012.62 3.18 9.87 9.87 0 011 4.52 11.92 11.92 0 01-1 5.08 8.69 8.69 0 01-2.67 3.34 10.87 10.87 0 01-4 1.83 21.57 21.57 0 01-5 .55h-4.15zm36.14 28.2h14.5a23.11 23.11 0 004.73-.5 13.38 13.38 0 004.27-1.65 9.42 9.42 0 003.1-3 8.52 8.52 0 001.2-4.68 9.16 9.16 0 00-.55-3.2 7.79 7.79 0 00-1.57-2.62 8.38 8.38 0 00-2.45-1.85 10 10 0 00-3.18-1v-.1a9.28 9.28 0 004.43-2.82 7.42 7.42 0 001.67-5 8.34 8.34 0 00-1.15-4.65 7.88 7.88 0 00-3-2.73 12.9 12.9 0 00-4.17-1.3 34.42 34.42 0 00-4.63-.32h-13.2zm7.8-28.8h5.3a10.79 10.79 0 011.85.17 5.77 5.77 0 011.7.58 3.33 3.33 0 011.23 1.13 3.22 3.22 0 01.47 1.82 3.63 3.63 0 01-.42 1.8 3.34 3.34 0 01-1.13 1.2 4.78 4.78 0 01-1.57.65 8.16 8.16 0 01-1.78.2H165zm0 14.15h5.9a15.12 15.12 0 012.05.15 7.83 7.83 0 012 .55 4 4 0 011.58 1.17 3.13 3.13 0 01.62 2 3.71 3.71 0 01-.47 1.95 4 4 0 01-1.23 1.3 4.78 4.78 0 01-1.67.7 8.91 8.91 0 01-1.83.2h-7z"
                fill="url(#a)"
                data-name="Layer 1"
              />
            </g>
          </s.THMDBLogo>
          <input type="checkbox" onChange={handleOnChange} />
        </Container>
      </s.Header>
      <s.Content>{children}</s.Content>
    </s.Wrapper>
  )
}
export default Base
