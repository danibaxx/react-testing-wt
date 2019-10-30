import wait from './wait';

// pre-written mock from jest
jest.useFakeTimers()

// 3 ways to wait for the promise to finish with jest
// done() === telling jest that the test is done running and needs to be called by calling it.
// very verbose
// test('wait for promise to resolve', () => {
//   wait(3).then(result => {
//     expect(result).toBe('hurray')
  // done()

// return === tells jest to wait to finish running the test
// test('wait for promise to resolve', () => {
//   return wait(3).then(result => {
//     expect(result).toBe('hurray')
//   })

  // adding async/await
  // async === async function, await telling jest to wait for it to resolve.
  test('wait for promise to resolve', async () => {
    const spy = jest.fn()
    const waitFn = wait(3,spy)

    // will fast forward in time.
    jest.runAllTimers()

    const result = await waitFn
    // const result = await wait(3, spy)

    expect(result).toBe('hurray')
    expect(spy).toHaveBeenCalledWith('hurray')
    expect(spy).toHaveBeenCalledTimes(1)

  // this test fails as the promise didn't finish once test was ran, must wait to resolve
  // const result = wait(3)
  // expect(result).toBe('hurray')
})