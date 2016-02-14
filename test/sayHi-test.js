import sayHi from '../src/sayHi'
import expect from 'expect'

describe('sayHi', () => {
  it('return hello, name', () => {
    expect(
      sayHi('Net')
    ).toEqual('Hello, Net')
  })
})
