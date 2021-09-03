module.exports = async (letter, email, timezone, base_href) => {
  try {
    let sletter = await fs.readFileSync(letter, 'utf-8')
    sletter = sletter.replace(
      /SILENTCODERSHOUR24/g,
      timezoneSet(timezone, 'fulltime24')
    )
    sletter = sletter.replace(
      /SILENTCODERSHOUR12/g,
      timezoneSet(timezone, 'fulltime12')
    )
    sletter = sletter.replace(/SILENTCODERSMINUTE/g, timezoneSet(timezone, 'i'))
    sletter = sletter.replace(/SILENTCODERSSECOND/g, timezoneSet(timezone, 's'))
    sletter = sletter.replace(/SILENTCODERSDAY/g, timezoneSet(timezone, 'd'))
    sletter = sletter.replace(/SILENTCODERSMONTH/g, timezoneSet(timezone, 'm'))
    sletter = sletter.replace(/SILENTCODERSYEAR/g, timezoneSet(timezone, 'Y'))
    sletter = sletter.replace(
      /SILENTCODERSFULLDATE/g,
      timezoneSet(timezone, 'full')
    )
    sletter = sletter.replace(
      /SILENTCODERS2FULLDATE/g,
      timezoneSet(timezone, 'full2')
    )
    sletter = sletter.replace(
      /SILENTCODERSDATEONLY1/g,
      timezoneSet(timezone, 'jdate')
    )
    sletter = sletter.replace(
      /SILENTCODERSDATEONLY2/g,
      timezoneSet(timezone, 'jdate2')
    )
    sletter = sletter.replace(/SILENTCODERSEMAIL/g, email)
    sletter = sletter.replace(
      /EMAILURLSILENTC0DERS/g,
      Buffer.from(email).toString('base64')
    )
    sletter = sletter.replace(
      /SILENTCODERSLIMAHURUF/g,
      randomstring.generate({ length: 5, charset: 'alphabetic' })
    )
    sletter = sletter.replace(
      /SILENTCODERSBANYAKHURUF/g,
      randomstring.generate({ length: 50, charset: 'alphabetic' })
    )
    sletter = sletter.replace(/USER/g, email.replace(/@[^@]+$/, ''))
    sletter = sletter.replace(/DOMAIN/g, email.replace(/.*@/, ''))
    sletter = sletter.replace(
      /DOMC/g,
      email
        .match(/(?<=@)[^.]+(?=\.)/g)[0]
        .charAt(0)
        .toUpperCase() + email.match(/(?<=@)[^.]+(?=\.)/g)[0].slice(1)
    )
    sletter = sletter.replace(/DOMs/g, email.match(/(?<=@)[^.]+(?=\.)/g)[0])
    base_href = base_href.replace(/SILENTCODERSEMAIL/g, email)
    base_href = base_href.replace(
      /EMAILURLSILENTC0DERS/g,
      Buffer.from(email).toString('base64')
    )
    sletter = sletter.replace(
      /SILENTCODERSBASEURL/g,
      Buffer.from(base_href).toString('base64')
    )
    return Promise.resolve(sletter)
  } catch (err) {
    return Promise.reject(err)
  }
}
