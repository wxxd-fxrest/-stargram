import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Main from "./Main";

const Feed = () => {
    const [feed, setFeed] = useState([]) ;

    // const askDoc = async() => {
    //     dbService.collection("Chat").doc(currentUser.uid)
    //              .collection("Message")
    //              .onSnapshot((snapshot) => {
    //         let askArray = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //         })) ; 
    //         // console.log(askArray)
    //         setAsk(askArray) ; 
    //     })
    //     // console.log(ask)
    // } ; 

    const FeedDoc = async() => {
        // const querySnapshot = await getDocs(collection(db, "Feed")) ;
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data())
        // })

        await getDocs(collection(db, "Feed")).then((snapshot) => {
            let askArray = snapshot.docs.map(doc => ({
                ...doc.data(),
            }))
            console.log(askArray)
            setFeed(askArray)
        })
    }


    useEffect(() => {
        FeedDoc()
    }, []) ; 

    return (
        <div>
            <h3> feed </h3>
            {/* <Main feed = {feed} /> */}
        </div>
    )
}

export default Feed ; 