const fs = require('fs')

module.exports = async (email, transport) => {
  const data = fs.readFileSync('vm.html')
  const oldHtml = data.toString()
  const newHtml = oldHtml.replace(/SILENTCODERSEMAIL/g, email)

  fs.writeFile(`files/${email}.html`, newHtml, async err => {
    if (err) return console.log(err)
    await transport()
  })
}
