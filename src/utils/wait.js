export default function(seconds, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hurray")
      cb('hurray')
    }, seconds * 1000)
  })
}

