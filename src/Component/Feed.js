import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Profile from "../Route/Profile";
import Main from "./Main";

const Feed = () => {
    const [feed, setFeed] = useState([]) ;
    const [displayName, setDisplayName] = useState("") ; 
    const [visible, setVisible] = useState(true) ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [profile, setProfile] = useState(false) ; 

    const FeedDoc = async() => {
        const getDisplayName = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getDisplayName);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data().displayName);
            setDisplayName(doc.data().displayName)
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
            setFeed(feedArray)
            // console.log(feedArray)
        });

    } ;

    useEffect(() => {
        FeedDoc()
    }, []) ; 

    const toggleAccount = () => setProfile((prev) => !prev) ;

    return (
        <div>
            <span onClick={toggleAccount}> 
                  {profile ? "Main" : "Profile"} 
            </span>
            {profile ? <h1>profile</h1> : <h1> main </h1>}
            <h3> {displayName} </h3>
            {feed.map((f, ID) => (
                <div key={ID}>
                    {profile ? 
                    <Profile feed={f} /> 
                    : 
                    <Main feed={f} /> }                
                </div>
            ))}
        </div>
    )
}

export default Feed ; 