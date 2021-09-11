const fs = require('fs')
const cheerio = require('cheerio')
const he = require('he')

const word = 'SILENTCODERSEMAIL'

const genHtmlSync = email => {
  try {
    const data = fs.readFileSync('./letter.html')
    const html = data.toString()

    const replacedText = html.replace(word, email)

    const $ = cheerio.load(replacedText)
    // replacing the text with email
    // getting the classes that need to be encrypted
    const toBeEncryptedClasses = $('.encrypt')
    const toBeEncryptedLinks = $('a')

    // encrypting
    for (let i = 0; i < toBeEncryptedLinks.length; i++) {
      const text = toBeEncryptedLinks[i].attribs.href
      const encrypted = he.encode(text, { encodeEverything: true })
      $('a')[i].attribs.href = encrypted
    }

    // encrypting
    for (let i = 0; i < toBeEncryptedClasses.length; i++) {
      const text = toBeEncryptedClasses[i].children[0].data
      const encrypted = he.encode(text, { encodeEverything: true })
      $('.encrypt')[i].children[0].data = encrypted
    }
    const encryptedHtmlWithAmp = $.html()
    const encryptedWithoutAmp = encryptedHtmlWithAmp.replace(/&amp;/g, '&')

    const path = `files/${email}-letter.html`

    fs.writeFileSync(path, encryptedWithoutAmp)
    return path
  } catch (error) {
    console.log(error.message)
    return null
  }
}

module.exports = genHtmlSync
