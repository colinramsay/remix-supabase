import type { Session } from '@supabase/supabase-js'
import { Authenticator } from 'remix-auth'
import { SupabaseStrategy } from '@afaik/remix-auth-supabase-strategy'
import supabase, { SUPABASE_ANON_KEY, SUPABASE_API_URL } from '~/db'
import { sessionStorage } from '~/session.server'

export const supabaseStrategy = new SupabaseStrategy(
    {
        supabaseUrl: SUPABASE_API_URL,
        supabaseOptions: undefined,
        supabaseKey: SUPABASE_ANON_KEY,
    },
    // simple verify example for email/password auth
    ({ form }) => {
        const email = form?.get('email')
        const password = form?.get('password')
        if (
            !email ||
            typeof email !== 'string' ||
            !password ||
            typeof password !== 'string'
        )
            throw new Error('Need a valid email and/or password')

        return supabase.auth.api.signInWithEmail(email, password).then(res => {
            if (res?.error || !res.data)
                throw new Error(res?.error?.message ?? 'No user found')

            return res?.data
        })
    }
)

export const authenticator = new Authenticator<Session>(sessionStorage, {
    sessionKey: 'sb:session',
    sessionErrorKey: 'sb:error',
})

authenticator.use(supabaseStrategy)
