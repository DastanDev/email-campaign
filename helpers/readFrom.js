const timezoneSet = require('./timezoneSet')
const randomstring = require('randomstring')

module.exports = (from, email, timezone) => {
  try {
    from = from.replace(
      /SILENTCODERSHOUR24/g,
      timezoneSet(timezone, 'fulltime24')
    )
    from = from.replace(
      /SILENTCODERSHOUR12/g,
      timezoneSet(timezone, 'fulltime12')
    )
    from = from.replace(/SILENTCODERSMINUTE/g, timezoneSet(timezone, 'i'))
    from = from.replace(/SILENTCODERSSECOND/g, timezoneSet(timezone, 's'))
    from = from.replace(/SILENTCODERSDAY/g, timezoneSet(timezone, 'd'))
    from = from.replace(/SILENTCODERSMONTH/g, timezoneSet(timezone, 'm'))
    from = from.replace(/SILENTCODERSYEAR/g, timezoneSet(timezone, 'Y'))
    from = from.replace(/SILENTCODERSFULLDATE/g, timezoneSet(timezone, 'full'))
    from = from.replace(
      /SILENTCODERS2FULLDATE/g,
      timezoneSet(timezone, 'full2')
    )
    from = from.replace(
      /SILENTCODERSDATEONLY1/g,
      timezoneSet(timezone, 'jdate')
    )
    from = from.replace(
      /SILENTCODERSDATEONLY2/g,
      timezoneSet(timezone, 'jdate2')
    )
    from = from.replace(/USER/g, email.replace(/@[^@]+$/, ''))
    from = from.replace(
      /DOMC/g,
      email
        .match(/(?<=@)[^.]+(?=\.)/g)[0]
        .charAt(0)
        .toUpperCase() + email.match(/(?<=@)[^.]+(?=\.)/g)[0].slice(1)
    )
    from = from.replace(/DOMs/g, email.match(/(?<=@)[^.]+(?=\.)/g)[0])
    from = from.replace(/DOMAIN/g, email.replace(/.*@/, ''))
    from = from.replace(/SILENTCODERSEMAIL/g, email)
    from = from.replace(
      /SILENTCODERSLIMAHURUF/g,
      randomstring.generate({ length: 5, charset: 'alphabetic' })
    )
    from = from.replace(
      /SILENTCODERSBANYAKHURUF/g,
      randomstring.generate({ length: 50, charset: 'alphabetic' })
    )
    return Promise.resolve(from)
  } catch (err) {
    return Promise.reject(err)
  }
}
