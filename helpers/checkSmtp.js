const nodemailer = require('nodemailer')

module.exports = async function checkSMTP (data) {
  try {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: data.host,
      port: data.port,
      secure: data.secure,
      auth: {
        user: data.user,
        pass: data.pass
      }
    })
    await transporter.verify()
    return Promise.resolve(transporter)
  } catch (err) {
    return Promise.reject(`SMTP ERROR => ${err.message}`)
  }
}
