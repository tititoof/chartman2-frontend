const mockRouter = {
  back: jest.fn(),
  push: jest.fn((route) => route)
}

export default mockRouter