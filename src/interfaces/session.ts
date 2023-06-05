import session, { Session } from "express-session";
import { User } from "../types/Users";




declare module 'express-session'{
 export  interface  new_session_variables {
    user: User
  }
}