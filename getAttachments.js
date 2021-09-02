const fs = require("fs")

const getAttachments = () => {
  const files = fs.readdirSync("./attachments")
  return files.map((fileName) => ({
    filename: fileName,
    path: `./attachments/${fileName}`,
  }))
}

module.exports = getAttachments
