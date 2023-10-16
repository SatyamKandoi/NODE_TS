import bcrypt from 'bcrypt'
import { IUser } from '../@types/user';
async function hashPassword (user:IUser) {

    const password = user.password
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
  }