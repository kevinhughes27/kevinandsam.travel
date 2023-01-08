import React from 'react'
import { SizesProvider } from 'react-sizes'
import Nav from '../components/Nav'

export default function Layout({ children }) {
  const config = { fallbackWidth: 360, fallbackHeight: 640 }

  return (
    <SizesProvider config={config}>
      <Nav />
      <main>
        { children }
      </main>
    </SizesProvider>
  )
}
