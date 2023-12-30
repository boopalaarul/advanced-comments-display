"use client"
import App from './ui-components/app-component'
import AuthorizeProvider from './ui-components/context/authorize-provider'
import SubmitModeProvider from './ui-components/context/submitmode-provider'

export default function Home() {
  return (
    <AuthorizeProvider>
      <SubmitModeProvider>
        <App />
      </SubmitModeProvider>          
    </AuthorizeProvider>
  )
}
