import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, collectionGroup, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";


const Profile = ({feed}) => {
    const {currentUser} = useContext(AuthContext) ; 
    console.log(feed)

    const feedAll = () => {
        let arr = [] ;
        if(feed) {
            for(let i = 0; i < feed.length; i++) {
                arr.push(
                    <div key={i}>
                    {currentUser.uid === feed[i].UID ?
                        <div>
                        {feed ? 
                            <div className="Main">
                                <h6> {feed[i].displayName} </h6>
                                <img alt="" src={feed[i].attachmentUrl} width="200px" height="200px" />
                                <h5> {feed[i].message} </h5>
                            </div> : null }
                        </div> : null}
                    </div>
                )
            }
        }
        return arr ;
    }

    return (
        <div>
            <h4> Profile </h4>
            {feedAll()}
            <Link to="/">
                <button> 이전 </button>
            </Link>
        </div>
    )
}

export default Profile ; 