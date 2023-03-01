import { SessionProvider } from '@inrupt/solid-ui-react'
import React from 'react'

const SolidSessionProvider: React.FC = ({ children }) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  )
}

export default SolidSessionProvider