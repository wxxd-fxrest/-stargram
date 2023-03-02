import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
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

    const FeedDoc = async() => {
        const FeedCollection = query(collection(db, "Feed"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data()
                })
            });
            setFeed(feedArray)
            // console.log(feed)
        });

        const getDisplayName = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getDisplayName);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data().displayName);
            setDisplayName(doc.data().displayName)
        });
    } ;

    const onClick = (event) => {
        event.preventDefault() ;
        setVisible(!visible)
    } ; 

    useEffect(() => {
        FeedDoc()
    }, []) ; 

    return (
        <div>
            <button onClick={onClick}> Profile </button>
            <h1> {displayName} </h1>
            {feed.map((f, ID) => (
                <div key={ID}>
                    {visible ? 
                    <Main feed={f} /> 
                    : 
                    <Profile feed={f} /> }                
                </div>
            ))}
        </div>
    )
}

export default Feed ; 