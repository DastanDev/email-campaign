const fs = require('fs')
const cheerio = require('cheerio')
const he = require('he')
var ent = require('ent')

const genHtml = () => {
  fs.readFile('./letter.html', (err, data) => {
    if (err) return console.log(err.message)
    //
    const $ = cheerio.load(data.toString())
    const toBeEncrypted = $('.encrypt')
    for (let i = 0; i < toBeEncrypted.length; i++) {
      const text = toBeEncrypted[i].children[0].data
      const encrypted = he.encode(text, { encodeEverything: true })
      $('.encrypt')[i].children[0].data = encrypted
    }
    const encryptedHtmlWithAmp = $.html()
    const encryptedWithoutAmp = encryptedHtmlWithAmp.replace(/&amp;/g, '&')

    fs.writeFileSync('files/letter.html', encryptedWithoutAmp)
  })
}

module.exports = genHtml
