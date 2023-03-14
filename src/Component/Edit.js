import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import Attach from '/Users/drizzle/stargram/src/img/attach.png'

const Edit = () => {
    const [attachment, setAttachment] = useState("") ; 
    const [next, setNext] = useState(false) ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [displayName, setDisplayName] = useState("") ; 
    const [userData, setUserData] = useState("") ; 
    const uuidv4ID = uuidv4() ;
    const navigate = useNavigate();

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ; 
        } 
    } ; 

    const getLoginUser = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
        }); 
    } ;

    useEffect(() => {
        getLoginUser() ; 
    }, []) ;

    const onSubmit = async(event) => {
        event.preventDefault();

        let attachmentUrl = "" ; 
        let uploadTask ; 
        if(attachment !== "") {
            const attachmentRef = ref(storage, `images/${currentUser.uid + uuidv4()}`)
            uploadTask = uploadBytes(attachmentRef, attachment)
            await uploadString(attachmentRef, attachment, 'data_url')
        } ;
        setAttachment("") ; 
        setNext("") ;
        uploadTask.then(async (snapshot) => {
            attachmentUrl = await getDownloadURL(snapshot.ref)
            await updateDoc(doc(db, "Users", `${currentUser.uid}`), {
                attachmentUrl,
            })
        })
        navigate("/");
    } ;

    const onSubmitName = async(event) => {
        event.preventDefault() ; 
        await updateDoc(doc(db, "Users", `${currentUser.uid}`), {
            displayName: displayName,
        })
        navigate("/");
    }

    const onFileChange = (event) => {
        setAttachment(null) ;
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setAttachment(result) ; 
        } ;
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile) ; 
        }
    } ; 

    return (
        <div className="Edit">
            <h3> Profile Edit </h3>
            <button onClick={((e) => {
                    e.preventDefault() ;
                    navigate("/")
                })}> 이전 </button>
            <form onSubmit={onSubmit} className="Edit_Attachment">
                {attachment ? 
                <>
                    <img src={attachment} width="200px" height="200px" />
                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile">
                        <img src={Attach} alt="" />
                    </label>
                    <input type="submit" value="OK" className="Edit_Attachment_OK"/> 
                </> : <>
                    <img src={userData.attachmentUrl} width="200px" height="200px" />
                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile">
                        <img src={Attach} alt="" />
                    </label>
                </>}
            </form>
            <form onSubmit={onSubmitName} className="Edit_displayName">
                {displayName ? 
                    <>
                    <input type="text"
                            name="displayName"
                            placeholder={displayName}
                            required 
                            maxLength="6"
                            value={displayName}
                            onChange={onChange} 
                            className="Edit_displayName_input"/>
                    <input type="submit" value="OK" className="Edit_displayName_OK"/> 
                    </> : <>
                    <input type="text"
                            name="displayName"
                            placeholder={userData.displayName}
                            required 
                            value={displayName}
                            onChange={onChange} 
                            className="Edit_displayName_input"/>
                    </>}
            </form>
        </div>
    )
}

export default Edit ; 