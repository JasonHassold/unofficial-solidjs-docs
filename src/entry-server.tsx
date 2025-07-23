// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'
import { getHtmlProps } from '@kobalte/solidbase/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html {...getHtmlProps()}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
          />
          {assets}
        </head>
        <body class="font-inter dark:bg-slate-900 dark:text-slate-100 text-slate-900 bg-slate-100">
          <div id="app" class="flex flex-col h-screen">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
))
