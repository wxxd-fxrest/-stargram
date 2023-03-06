import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import YourProfile from "../Component/YourProfile";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutProfile = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;
    const location = useLocation() ;

    const pathname = location.pathname ; 
    const pathName= (pathname.split('/')[2]);
    const pathUID= (pathname.split('/')[3]);

    const getYourFeed = async() => {
        const FeedCollection = query(collection(db, "Feed"), 
            where("UID", "==", `${pathUID}`), 
            orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setFeedUser(feedArray) ;
        });
    } ;

    useEffect(() => {
        getYourFeed() ;
    }, []) ;
    
    // console.log("pathUID => ", pathUID)
    // console.log(feedUser)

    return (
        <div>
            <Link to="/">
                <button> 이전 </button>
            </Link>
            <p> {pathName} </p>
            {feedUser.map((f, ID) => (
                <div key={ID}>
                    <YourProfile feedUser={f} pathUID={pathUID} />             
                </div>
            ))}
        </div>
    )
}

export default AboutProfile ; 