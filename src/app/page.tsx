"use client"
import App from './ui-components/app-component'
import { AuthorizeContext } from './ui-components/context/authorize-context'
import SubmitModeProvider from './ui-components/context/submitmode-provider'

export default function Home() {
  return (
    <AuthorizeContext.Provider value="Frank">
      <SubmitModeProvider>
        <App />
      </SubmitModeProvider>          
    </AuthorizeContext.Provider>
  )
}
