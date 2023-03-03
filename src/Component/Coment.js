import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Receive from "./Receive";

const Coment = ({feed}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [coment, setComent] = useState([]) ; 

    const ComentDoc = async() => {
        const FeedCollection = query(collection(db, "Feed", `${feed.DocID}`, "Coment"), 
            orderBy("date", "asc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(), 
                })
            });
            // console.log(feedArray)
            setComent(feedArray)
        });
    }

    useEffect(() => {
        ComentDoc() ;
    }, []) ;

    // console.log(feed)
    return (
        <div>
            {coment.map((c, ID) => (
                <div key={ID}>
                    <Receive coment={c} feed={feed}/>
                </div> 
            ))}
        </div>
    )
}

export default Coment ; 