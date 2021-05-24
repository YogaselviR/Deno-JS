import AuthService from '../services/AuthService.ts';

export const serializer = async (userInfo: any) => {
    let serializedId = Math.floor(Math.random() * 1000000000);
    userInfo.id = serializedId;
    try {     
      if(!userInfo.emails[0]) userInfo.emails = ''; 
      const checkUser = await AuthService.checkUserId(userInfo.providerUserId);
      if(!checkUser) {
        await AuthService.createUser(userInfo);
      } else {
        serializedId = checkUser.authId;
      }
      return serializedId;
    } catch(err) {
      return err;
    }
};

export const deserializer = async (serializedId: (string | number)) => {
    try {
      const userInfo = await AuthService.getUser(serializedId);
      return userInfo;  
    } catch(err) {
      return err;
    }
};