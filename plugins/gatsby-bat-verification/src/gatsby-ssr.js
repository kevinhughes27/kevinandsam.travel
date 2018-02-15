import React from "react"

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const path = `/.well-known/brave-payments-verification.txt`

  setHeadComponents([
    <link
      key={`gatsby-bat-verification`}
      type=`text/plain`
      href={path}
    />,
  ])
}
