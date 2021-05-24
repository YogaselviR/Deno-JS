import { DashportOak } from 'https://deno.land/x/dashport@v1.2.1/mod.ts';
import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import router from './routes/AuthRouter.ts';

const port = 8000;
const app = new Application();
const dashport = new DashportOak(app);
app.use(dashport.initialize);

router.use(async (ctx: Context, next: Function) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("error", (evt) => {
	console.log(evt.error);
});


console.log('Server listening on port', port);
await app.listen({port: port});
  