import { useRouter } from 'next/navigation'
import '@testing-library/jest-dom/extend-expect'

// mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// set up a new mocking function for push method
const pushMock = jest.fn()

// mock a return value on useRouter
useRouter.mockReturnValue({
  query: {},
  // return mock for push method
  push: pushMock,
  // ... add the props or methods you need
})

// Mocking methods which are not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    naver: {
      LoginWithNaverId: jest.fn(),
      getLoginStatus: jest.fn(),
    },
  })),
})

// 네이버 로그인 API mock
Object.defineProperty(window, 'naver', {
  value: {
    LoginWithNaverId: jest.fn().mockImplementation(() => {
      return { init: jest.fn() }
    }),
    getLoginStatus: jest.fn(),
  },
})
