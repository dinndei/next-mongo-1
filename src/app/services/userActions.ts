import axios from "axios";
import { IUser } from "../types/IUser";

export const signUpUser = async (userName: string, email: string, password: string): Promise<IUser> => {
    try {
        let res = await axios.post('http://localhost:3000/api/user/signup',
            { userName, email, password },
            {
                headers: {
                    'Cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                },

            });
            console.log("res in action",res.data.user);
            
        return res.data.user;
    }
    catch (error) {
        console.error(error)
        throw new Error("error " + error);
    }
//להוסיף בדיקה אם כבר קיים
}

export const loginUser = async (userName: string)=> {
    try {
        let res = await axios.get(`http://localhost:3000/api/user/getUser?userName=${userName}`,
            {
                headers: {
                    'Cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                },

            });
            console.log("res in action",res.data.user);
            
        return res.data.user;
    }
    catch (error) {
        console.error(error)
        throw new Error("error in login user" + error);
    }

}


