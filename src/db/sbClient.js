import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://qxrlnxuihnkxiceinalf.supabase.co'
const supabaseAnonKey = ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)