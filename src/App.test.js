import axios from 'axios';
import React from "react";

// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

jest.mock('axios', () => {
  return {
    // jest.fn makes it a spy
    get: jest.fn(() => Promise.resolve({
      // returns some data
      data: {
        message: ['foo.jpg', 'bar.jpg']
      }
    }))
  }
})


// this just allows react-testing-library to do some
// routine cleanup after each test runs (to reset the DOM and such)
afterEach(rtl.cleanup);

test('Made API call', async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  expect(axios.get).toHaveBeenCalled();
})

test('Cleared images', async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  const clear = wrapper.getByText(/clear/i)

  // .act === go act on this library, go do something, do user interaction
  // this will go act and simulate the button being clicked
  // which can then be tested against.
  rtl.act(() => {
    rtl.fireEvent.click(clear)
  })

  // this will expect it to not be there, null
  expect(wrapper.queryByAltText(/dog/i)).toBeNull()

})

test("Render the heading", async () => {
  // render our React app into an in-memory DOM so we can test against it
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);
  
  // debug will show like the console.
  // wrapper.debug()

  // element is now our dom element that we can test against
  const element = wrapper.getByText(/the dog website/i);

  // test will fail if element is not visible to our robot eyes
  expect(element).toBeVisible();
});

test("Render count input", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);
  // using a regular expression instead of a string allows our
  // query to be much more flexible. for example, if the text becomes
  // all uppercase, we don't want our test to break
  const element = wrapper.getByPlaceholderText(/count/i);
  expect(element).toHaveValue(1);
});

test('<App /> snapshot', async () => {
  const wrapper = rtl.render(<App />)
  await wrapper.findAllByAltText(/dog/i);

  expect(wrapper.asFragment()).toMatchSnapshot()
})
