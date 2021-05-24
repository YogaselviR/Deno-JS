import GitHubStrategy from 'https://deno.land/x/dashport_github/mod.ts';
import { AuthProvider } from './AuthProvider.ts';

export const ghStrat = new GitHubStrategy({
    client_id: AuthProvider.github_client_id,
    client_secret: AuthProvider.github_client_secret,
    redirect_uri: 'http://localhost:8000/gitHubAuth',
    scope: "read:user",
});