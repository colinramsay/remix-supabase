import { createClient } from '@supabase/supabase-js'
import invariant from 'tiny-invariant'

const MAYBE_SUPABASE_API_URL = process.env.SUPABASE_API_URL
const MAYBE_SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

invariant(
    typeof MAYBE_SUPABASE_API_URL === 'string',
    'SUPABASE_API_URL required'
)
invariant(
    typeof MAYBE_SUPABASE_ANON_KEY === 'string',
    'MAYBE_SUPABASE_ANON_KEY required'
)

const SUPABASE_API_URL = MAYBE_SUPABASE_API_URL as string
const SUPABASE_ANON_KEY = MAYBE_SUPABASE_ANON_KEY as string

const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY)

export { SUPABASE_API_URL, SUPABASE_ANON_KEY }

export default supabase
