import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import './app.css'
import Layout from '~/components/layout'

export default function App() {
  return (
    <Router root={Layout}>
      <FileRoutes />
    </Router>
  )
}
