const fs = require('fs')


module.exports = async email => {
  fs.readFile('vm.html', (err, data) => {
    if (err) return console.log(err.message)
    const html = data.toString()
    const newHtml = html.replace(/email/g, email)

    fs.writeFile('vm2.html', newHtml, err => {
      if (err) return console.log(err)
    })
  })
}
