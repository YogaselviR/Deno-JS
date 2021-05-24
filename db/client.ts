import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE } from "./config.ts";

const client = await new Client();

client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: DATABASE,
});

const run = async () => {
  // create database (if not created before)  
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);

  // select db
  await client.execute(`USE ${DATABASE}`);
};

run();

export default client;
