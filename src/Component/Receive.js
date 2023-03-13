import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const Receive = ({coment, pathDocID}) => {
    const {currentUser} = useContext(AuthContext) ; 

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱ?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${pathDocID}`, "Coment", `${coment.DocID}`)); 
        }
    } ;
    
    // console.log(coment) ;
    
    return (
        <div>
            {coment ? 
            <div className="Receive">
                <div className="Receive_Profile">
                    <img src={coment.Data.SendPhotoURL} width="30px" height="30px" /> 
                    <h6> {coment.Data.SendName} </h6>
                    <div className="Receive_Coment">
                        <h4> {coment.Data.Coment} </h4>
                    </div>
                </div>
                {currentUser.uid == coment.Data.SendUID ? 
                    <div>
                        <button onClick={onDelete} id="Receive_Delete_X" style={{display: "none"}}> X </button>
                    </div> : null}
                    <label htmlFor="Receive_Delete_X" className="Receive_Delete">
                        <h3 className="Receive_Delete_label"> X </h3>
                    </label>
            </div> : null}
        </div>
    )
}

export default Receive ; 