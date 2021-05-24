import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";

export default {
    // check if user exists 
    checkUserId: async (id: any) => {
        const [result] = await client.query(
            `SELECT * FROM ${TABLE.USERS} WHERE providerUserId = ? LIMIT 1`,
            [id],
          );
        return result;
    },

    // create user
    createUser: async (
        userInfo : any,
      ) => {
        if(!userInfo.emails) userInfo.emails = '';
        return await client.query(
          `INSERT INTO ${TABLE.USERS}(authId, email, displayName, provider, providerUserId) values(?, ?, ? , ?, ?)`,
          [
            userInfo.id,
            userInfo.emails,
            userInfo.displayName,
            userInfo.provider,
            userInfo.providerUserId
          ],
        );
    },

    // get user info
    getUser: async (id : any) => {
        const result = await client.query(
          `SELECT * FROM ${TABLE.USERS} WHERE authId = ? LIMIT 1`,
          [id],
        );
        return result;
    },
}
