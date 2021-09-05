const fs = require('fs')
const CryptoJS = require('crypto-js')
const cheerio = require('cheerio')

const encrypt = text => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}

const genHtml = () => {
  fs.readFile('./letter.html', (err, data) => {
    if (err) return console.log(err.message)
    //
    const $ = cheerio.load(data.toString())
    const toBeEncrypted = $('#encrypt')[0].children[0].data
    const encrypted = encrypt(toBeEncrypted)
    $('#encrypt')[0].children[0].data = encrypted
    const html = $.html()
    // write file
    fs.writeFile('files/letter.html', html, async err => {
      if (err) throw new Error(err)
    })

    // document.getElementById('encrypted').innerText = decrypt(encFromDom)
  })
}

genHtml()

module.exports = genHtml
