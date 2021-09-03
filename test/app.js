const fs = require('fs')
const title = 'my tsdfsdfitle'
const toBeWritten = `<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <script type="text/javascript">
            window.location.href = "https://e-co.xyz/?e=${title}"
        </script>
</html>
`
fs.readFile('./index.html', (err, data) => {
  if (err) return console.log(err.message)
  //
  const email = 'jon@doe.com'
  const html = data.toString()
  const newData = html.replace(/email/g, email)

  fs.writeFile('./index.html', newData, err => {
    if (err) return console.log(err.message)
    console.log('done')
  })
})
