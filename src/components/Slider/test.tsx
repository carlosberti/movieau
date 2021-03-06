import 'match-media.mock'
import { render, screen } from '@testing-library/react'

import Slider, { SliderSettings } from '.'

const settings: SliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

describe('<Slider />', () => {
  it('should render children as slider item', () => {
    const { container } = render(
      <Slider settings={settings}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Slider>
    )

    expect(
      screen.getByText(/item 1/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')
    expect(
      screen.getByText(/item 2/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')
    expect(container.firstChild).toMatchSnapshot()
  })
})
