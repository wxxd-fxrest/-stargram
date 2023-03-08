import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const DirectMessage = ({pathtMessage, loginMessage, pathUID, currentUID}) => {
    const {currentUser} = useContext(AuthContext) ;

    // const ii = () => {
    //     let arr = [] ;
    //     for(let i = 0; i < ask.length; i++) {
    //         // console.log(ask[i])
    //         // console.log(ask[i].messages[0].text)
    //         // console.log(ask[i].messages[1].text)
    //         arr.push (
    //             <div  key={i.id} className="Ask">

    //             </div>
    //         )}
    //     return arr; 
    // }

    return (
        <div>
            {/* <p>{Message[0].Data.SendName}</p>
            <p>{Message[0].Data.sendMessage}</p> */}
        </div>
    )
}

export default DirectMessage ; 