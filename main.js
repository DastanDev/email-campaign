
const decrypt = message => {
  const enc = crypto.AES.encrypt('hey', 'secret')
  const dec = crypto.AES.decrypt(enc, 'secret')
  const plainText = dec.toString(crypto.enc.Utf8)
}

decrypt('hey')
