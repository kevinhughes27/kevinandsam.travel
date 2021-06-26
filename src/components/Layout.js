import React from 'react'
import { SizesProvider } from 'react-sizes'
import Helmet from 'react-helmet'
import Nav from '../components/Nav'

export default function Layout({ children }) {
  const title = "kevinandsam.travel"

  const meta = [
    { property: "keywords", content: "travel, backpacking, digital nomad" },
    { name: "google-site-verification", content: "wWHpbIqBAdk1z_sNatMaGjs3BZPLK00EAcTO5vVqgTo"}
  ]

  const config = { fallbackWidth: 360, fallbackHeight: 640 }

  return (
    <SizesProvider config={config}>
      <Helmet title={title} meta={meta} />
      <Nav />
      <main>
        { children }
      </main>
    </SizesProvider>
  )
}
