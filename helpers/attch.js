const fs = require('fs')

module.exports = email => {
  const data = fs.readFileSync('vm.html')
  const oldHtml = data.toString()
  const newHtml = oldHtml.replace(/SILENTCODERSEMAIL/g, email)

  fs.writeFileSync(`files/${email}.html`, newHtml)
}
