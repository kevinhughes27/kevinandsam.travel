const fs = require(`fs`)
const Promise = require(`bluebird`)

exports.onPostBuild = (args, pluginOptions) =>
  new Promise(resolve => {
    const path = './public/.well-known'
    const {domain, token} = pluginOptions

    let fileContents = "This is a Brave Payments publisher verification file.\n\n"
    fileContents += `Domain: ${domain}\n`
    fileContents += `Token: ${token}\n`

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    fs.writeFileSync(`${path}/brave-payments-verification.txt`, fileContents)

    resolve()
  })
