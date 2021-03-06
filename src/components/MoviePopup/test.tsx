/* eslint-disable @typescript-eslint/no-var-requires */
import 'next-image.mock'
import { render, screen, waitFor } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import MoviePopup from '.'
import { useMovieStore } from 'store'

const movie = {
  id: 1,
  name: 'any_name',
  img: '/any_img',
  overview: 'any_overview',
  video: 'any_video'
}

describe('<MoviePopup />', () => {
  it('should render correctly', () => {
    useMovieStore.setState({ movie: movie })
    render(<MoviePopup />)

    expect(screen.getByRole('img', { name: 'any_name' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /favourite/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /watch later/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /any_name/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /any_overview/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/any_name trailer/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to/i })).toBeInTheDocument()
    expect(
      screen
        .getAllByLabelText('Click to close')[0]
        .parentElement!.getAttribute('aria-hidden')
    ).toBe('false')
  })

  it('should change icons color on click', () => {
    render(<MoviePopup />)

    const favouriteButton = screen.getByRole('button', {
      name: /favourite/i
    })
    const watchLaterButton = screen.getByRole('button', {
      name: /watch later/i
    })

    waitFor(() => {
      expect(favouriteButton).toHaveStyle('color: #eee')
      expect(watchLaterButton).toHaveStyle('color: #eee')
    })

    userEvent.click(favouriteButton)
    userEvent.click(watchLaterButton)

    waitFor(() => {
      expect(favouriteButton).toHaveStyle('color: yellow')
      expect(watchLaterButton).toHaveStyle('color: yellow')
    })
  })

  it('should handle watchLater and favourite buttons', () => {
    const useWatchLaterStore = jest.spyOn(
      require('store'),
      'useWatchLaterStore'
    )

    const setWatchLater = jest.fn()

    useWatchLaterStore.mockImplementation(() => ({
      setWatchLater,
      isWatchLater: jest.fn(() => true)
    }))

    const useFavouriteStore = jest.spyOn(require('store'), 'useFavouriteStore')

    const setFavourite = jest.fn()

    useFavouriteStore.mockImplementation(() => ({
      setFavourite,
      isFavourite: jest.fn(() => true)
    }))
    render(<MoviePopup />)

    userEvent.click(screen.getByLabelText(/click to favourite/i))
    userEvent.click(screen.getByLabelText(/click to watch later/i))

    expect(setWatchLater).toHaveBeenCalled()
    expect(setFavourite).toHaveBeenCalled()
  })

  it('should close when close button is clicked', () => {
    useMovieStore.setState({ movie: movie })
    render(<MoviePopup />)

    expect(screen.getByLabelText('Click to close icon')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Click to close icon'))
    expect(
      screen.queryByLabelText('Click to close icon')
    ).not.toBeInTheDocument()
  })

  it('should close when overlay is clicked', () => {
    useMovieStore.setState({ movie: undefined })
    render(<MoviePopup />)

    expect(screen.queryByLabelText('Click to close')).not.toBeInTheDocument()

    useMovieStore.setState({ movie: movie })
    const openelement = screen.getAllByLabelText('Click to close')[0]
    expect(openelement).toBeInTheDocument()

    userEvent.click(openelement)
    expect(screen.queryByLabelText('Click to close')).not.toBeInTheDocument()
  })
})
