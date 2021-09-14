'use strict'
const chalk = require('chalk')
const _ = require('lodash')
const fs = require('fs')
const settings = JSON.parse(fs.readFileSync('settings.json'))
const genhtmlSync = require('./helpers/genHtmlSync')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '25'

// functions
const readFrom = require('./helpers/readFrom')
const checkSMTP = require('./helpers/checkSmtp')
const readLetter = require('./helpers/readLetter')
const readSubject = require('./helpers/readSubject')
const genHtml = require('./helpers/genHtml')

;(async function () {
  console.log(chalk`
{bold xXx - Sender 2019}
{bold.red Code by xXx | admin@xXx.com} @ {green xXx.NET}
    `)
  // if (process.argv[2] == undefined) {
  //     console.log('Usage : node file.js listname.txt');
  //     // process.exit(1);
  // }
  let smtpConfig = {
    host: settings.smtp.host,
    port: settings.smtp.port,
    secure: settings.smtp.secure, // if port 587, false. if port 465 = true
    user: settings.smtp.user,
    pass: settings.smtp.pass
  }
  let base_href = 'https://a-nz.xyz/?e=EMAILURLSILENTC0DERS'
  try {
    //
    const transporter = await checkSMTP(smtpConfig)
    console.log(chalk`{bold [!] SMTP Checked, ready to use !}\n`)
    console.log(chalk`{bold [>] Open list file, listname.txt.}`)
    let mailist = await fs.readFileSync('listname.txt', 'utf-8')
    let emailist = mailist.split(/\r?\n/)
    console.log(chalk`{bold [!] Found ${emailist.length} line.}\n`)
    emailist = _.chunk(emailist, 20)
    for (let i = 0; i < emailist.length; i++) {
      await Promise.all(
        emailist[i].map(async email => {
          if (
            email.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            const doL = await readLetter(
              'letter.html',
              email,
              'Australia/Perth',
              base_href
            )

            fs.writeFileSync('dol.html', doL)

            const doF = await readFrom(settings.name, email)
            const doS = await readSubject(
              settings.subject,
              email,
              'Australia/Perth'
            )
            try {
              let mailConfig = {
                from: doF,
                html: fs.readFileSync(genhtmlSync(email)).toString(),
                subject: doS,
                to: email,
                headers: {
                  'X-MS-Exchange-Organization-MessageDirectionality':
                    'Originating',
                  'X-MS-Exchange-Organization-AuthAs': 'Internal',
                  'X-MS-Exchange-Organization-AuthMechanism': '02',
                  'X-MS-Exchange-Organization-AuthSource':
                    'MWHPR22MB0014.namprd22.prod.outlook.com',
                  'X-MS-Exchange-Organization-Network-Message-Id':
                    'ffe8bf42-c85a-42c8-a084-08d75b722819',
                  'X-MA4-NODE': 'false'
                }
              }

              await transporter.sendMail(mailConfig)
              console.log(chalk`{bold ${email} => SUCCESS}`)
            } catch (err) {
              console.log(chalk`{bold ${email} => ERROR : ${err.message}}`)
              fs.appendFileSync(
                'logs-failed.txt',
                email + ' => ' + err.message + '\n'
              )
            }
          }
        })
      )
    }
  } catch (error) {
    console.log(error)
  }
})()
