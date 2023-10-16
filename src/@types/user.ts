import { ObjectId } from "mongoose"

type IUser =  {
    id:ObjectId,
    firstName? :string,
    lastName?:string
    phone?:string
    password:string
    email:string
}

type IVerification =  {
    email : string,
    accessToken: string,
    expiresIn:Date
    User:ObjectId
}

type IResetPassword = {
    accessToken : string
    expiresIn:Date
    user:ObjectId
}

export type VerificationRequestPayload = Pick<IUser, 'email'>

export {IUser,IVerification,IResetPassword}