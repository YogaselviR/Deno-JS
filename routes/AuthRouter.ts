import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
import { DashportOak } from 'https://deno.land/x/dashport@v1.2.1/mod.ts';
import { serializer, deserializer } from '../config/Authconfig.ts';
import { googStrat } from '../config/googleAuth.ts';
import { ghStrat } from '../config/gitHubAuth.ts';
import { escapeHtml as ee } from "https://deno.land/x/escape/mod.ts";

const router = new Router();
const dashport = new DashportOak(new Application());


// google authentication
router.get('/googleAuth', 
  dashport.authenticate(googStrat, serializer, deserializer) as any,
  async (ctx: any, next: any) => {
    const user = ctx.locals[0];
	  const displayName = user.displayName;
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1 style="text-align: center">GOOGLE AUTHENTICATION!</h1>`;
    ctx.response.body += `<h3 style="text-align: center">Welcome ${ee(displayName)}!</h3>`;
    ctx.response.body += `<code style="white-space: pre">${ee(JSON.stringify(user, null, "\t"))}</code>`;
  }
);

// github authentication
router.get('/gitHubAuth', 
  dashport.authenticate(ghStrat, serializer, deserializer) as any,
  async (ctx: any, next: any) => {
    const user = ctx.locals[0];
	  const displayName = user.displayName;
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1 style="text-align: center">GITHUB AUTHENTICATION!</h1>`;
    ctx.response.body += `<h3 style="text-align: center">Welcome ${ee(displayName)}!</h3>`;
    ctx.response.body += `<code style="white-space: pre">${ee(JSON.stringify(user, null, "\t"))}</code>`;
  }
);

// log out
router.get('/log-out',
	dashport.logOut as any,
	async (ctx: any, next: any) => {
		ctx.response.body = "You've logged out";
	}
);


export default router;

