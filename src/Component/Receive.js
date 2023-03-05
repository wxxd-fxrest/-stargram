import { collection, deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const Receive = ({coment, feed}) => {
    const {currentUser} = useContext(AuthContext) ; 

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱ?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${feed.DocID}`, "Coment", `${coment.DocID}`)); 
        }
    } ;
    
    // console.log(coment)
    // console.log(feed)
    return (
        <div>
            {coment ? 
            <>
                <h6> {coment.Data.SendName} </h6>
                <img src={coment.Data.SendPhotoURL} width="30px" height="30px" /> 
                <h4> {coment.Data.Coment} </h4>
                {currentUser.uid == coment.Data.SendUID ? 
                    <div>
                        <button onClick={onDelete}> coment 삭제 </button>
                    </div> : null}
            </> : null}
        </div>
    )
}

export default Receive ; 