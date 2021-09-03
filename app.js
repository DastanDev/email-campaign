const app = require('express')()
const run = require('./run')

app.get('/', async () => {
  console.log('process started...')
  await run()
  console.log('process finished...')
})

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`)
})
