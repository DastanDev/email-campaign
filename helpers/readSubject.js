const timezoneSet = require('./timezoneSet')
const randomstring = require('randomstring')

module.exports = async (subject, email, timezone) => {
  try {
    subject = subject.replace(
      /SILENTCODERSHOUR24/g,
      timezoneSet(timezone, 'fulltime24')
    )
    subject = subject.replace(
      /SILENTCODERSHOUR12/g,
      timezoneSet(timezone, 'fulltime12')
    )
    subject = subject.replace(/SILENTCODERSMINUTE/g, timezoneSet(timezone, 'i'))
    subject = subject.replace(/SILENTCODERSSECOND/g, timezoneSet(timezone, 's'))
    subject = subject.replace(/SILENTCODERSDAY/g, timezoneSet(timezone, 'd'))
    subject = subject.replace(/SILENTCODERSMONTH/g, timezoneSet(timezone, 'm'))
    subject = subject.replace(/SILENTCODERSYEAR/g, timezoneSet(timezone, 'Y'))
    subject = subject.replace(
      /SILENTCODERSFULLDATE/g,
      timezoneSet(timezone, 'full')
    )
    subject = subject.replace(
      /SILENTCODERS2FULLDATE/g,
      timezoneSet(timezone, 'full2')
    )
    subject = subject.replace(
      /SILENTCODERSDATEONLY1/g,
      timezoneSet(timezone, 'jdate')
    )
    subject = subject.replace(
      /SILENTCODERSDATEONLY2/g,
      timezoneSet(timezone, 'jdate2')
    )
    subject = subject.replace(/USER/g, email.replace(/@[^@]+$/, ''))
    subject = subject.replace(/DOMAIN/g, email.replace(/.*@/, ''))
    subject = subject.replace(
      /DOMC/g,
      email
        .match(/(?<=@)[^.]+(?=\.)/g)[0]
        .charAt(0)
        .toUpperCase() + email.match(/(?<=@)[^.]+(?=\.)/g)[0].slice(1)
    )
    subject = subject.replace(/DOMs/g, email.match(/(?<=@)[^.]+(?=\.)/g)[0])
    subject = subject.replace(/SILENTCODERSEMAIL/g, email)
    subject = subject.replace(
      /SILENTCODERSLIMAHURUF/g,
      randomstring.generate({ length: 5, charset: 'alphabetic' })
    )
    subject = subject.replace(
      /SILENTCODERSBANYAKHURUF/g,
      randomstring.generate({ length: 50, charset: 'alphabetic' })
    )
    return Promise.resolve(subject)
  } catch (err) {
    return Promise.reject(err)
  }
}
