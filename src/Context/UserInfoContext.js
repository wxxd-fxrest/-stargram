import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const UserInfoContext = createContext() ; 

export const UserInfoContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [userInfo, setUserInfo] = useState({}) ;

    useEffect(() => {
        const getUserInfo = async() => {
            const getInfo = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
            const querySnapshot = await getDocs(getInfo);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setUserInfo(doc.data())
            });
        }
        
        return () => {
            getUserInfo() ; 
        } ;
    }, []) ; 

    return (
        <UserInfoContext.Provider value={userInfo}>
            {children}
        </UserInfoContext.Provider>
    ) ;
} ; 