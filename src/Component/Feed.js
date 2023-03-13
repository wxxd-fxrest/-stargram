import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Profile from "../Route/Profile";
import Main from "./Main";

const Feed = () => {
    const [feed, setFeed] = useState([]) ;
    const {currentUser} = useContext(AuthContext) ; 
    const [profile, setProfile] = useState(false) ; 
    const [userData, setUserData] = useState("") ; 

    const FeedDoc = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data()) ;
        }); 

        const FeedCollection = query(collection(db, "Feed"), orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setFeed(feedArray) ;
        });
    } ;

    useEffect(() => {
        FeedDoc() ;
    }, []) ; 

    const toggleAccount = () => setProfile((prev) => !prev) ;

    return (
        <div className="Feed">
            <div className="Feed_span">
            {profile ? 
                <span onClick={toggleAccount}> 
                    Home
                </span> : <span onClick={toggleAccount}> 
                    {userData.displayName}
                </span>}
            </div>
            {feed.map((f, ID) => (
                <div key={ID}>
                    {profile ? 
                    <Profile feed={f} userData={userData} /> 
                    : 
                    <Main feed={f} userData={userData}/> }                
                </div>
            ))}
        </div>
    )
}

export default Feed ; 