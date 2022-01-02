import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'remix'

import styles from './tailwind.css'

import type { MetaFunction } from 'remix'
import { createContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

export const meta: MetaFunction = () => {
    return { title: 'New Remix App' }
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}

export interface ICtx {
    session: Session | null
    set: (session: Session | null) => void
}

export const ctx: ICtx = {
    session: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    set: () => {},
}

export const SessionContext = createContext(ctx)

export default function App() {
    const [session, setSession] = useState<Session | null>(null)

    return (
        <SessionContext.Provider
            value={{
                set: setSession,
                session,
            }}
        >
            <html className="h-full bg-white" lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1"
                    />
                    <Meta />
                    <Links />
                </head>
                <body className="h-full">
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    {process.env.NODE_ENV === 'development' && <LiveReload />}
                </body>
            </html>
        </SessionContext.Provider>
    )
}
