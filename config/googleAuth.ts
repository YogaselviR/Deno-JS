import GoogleStrategy from 'https://deno.land/x/dashport_google/mod.ts';
import { AuthProvider } from './AuthProvider.ts';

export const googStrat = new GoogleStrategy({
    client_id: AuthProvider.google_client_id,
    client_secret: AuthProvider.google_client_secret,
    redirect_uri: 'http://localhost:8000/googleAuth',
    response_type: 'code', 
    scope: 'profile email openid',
    grant_type: 'authorization_code',
});