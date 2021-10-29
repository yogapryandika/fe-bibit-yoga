import App from '../App'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen, render, waitFor } from '../test-utils'

import '@testing-library/jest-dom/extend-expect'

import Movies from '../features/Movies'

const observe = jest.fn()
const unobserve = jest.fn()

window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}))

export const handlers = [
  rest.get('/api/movies', (req, res, ctx) => {
    return res(ctx.json({
      Title: "Batman",
      imdbID: "tt0372784",
      Type: "Movie"
    }), ctx.delay(150))
  })
]

test('Should render app without crashing', () => {
  const { getByText } = render(<App />)
  const titleText = getByText(/MovieGO/i)
  expect(titleText).toBeInTheDocument()
})

it("should show content", async () => {
  const { getByTestId } = render(<Movies />);
  const input = getByTestId("name")
  fireEvent.input(getByTestId("name"), {
    target: {
      value: "Batman"
    }
  })
  fireEvent.submit(input)

  await waitFor(() => expect(getByTestId("content")).toBeInTheDocument())

})



