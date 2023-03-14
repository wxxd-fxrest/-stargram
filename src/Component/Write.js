import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Attach from '../img/instagram_sellectIMG.png'
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";

const Write = ({userInfo}) => {
    const [attachment, setAttachment] = useState("") ; 
    const [next, setNext] = useState(false) ; 
    const [messageText, setMessageText] = useState("") ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [displayName, setDisplayName] = useState("") ; 
    const uuidv4ID = uuidv4()
    const navigate = useNavigate();

    const getUserInfo = async() => {
        const getInfo = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getInfo);
        querySnapshot.forEach((doc) => {
            setDisplayName(doc.data().displayName)
        });
    } ;

    useEffect(() => {
        getUserInfo()
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

            await addDoc(collection(db, "Feed"), {
                UID: currentUser.uid,
                displayName: displayName, 
                message: messageText, 
                UUID: uuidv4ID, 
                date: Timestamp.now(),
                attachmentUrl,
            })
        })
        navigate("/");
    } ;

    const onChange = (event) => {
        const {target : {value}} = event ; 
        setMessageText(value) ; 
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

    return(
        <div className="Write">
            <button onClick={((e) => {
                e.preventDefault() ;
                navigate("/")})}> 이전 </button>
            <form onSubmit={onSubmit} className="Write_form">
                <h4> Write </h4>
                <div className="Write_form_input">
                    <input type="textarea" 
                            placeholder="message..."
                            value={messageText || ''}
                            onChange={onChange} 
                            className="Write_form_input_textarea"/>
                    <input type="submit" value="OK" className="Write_form_input_OK"/> 
                </div>
                {attachment ? 
                <>
                    <input type="file"
                        style={{display:"none"}}
                        id="inputFile"
                        onChange={onFileChange}
                        required />
                    <label htmlFor="inputFile" className="Write_attach_label_sellect">
                        <img src={attachment} alt="" />
                    </label>
                </> : <>
                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile" className="Write_attach_label">
                        <img src={Attach} alt="" />
                        <h4> 이미지를 선택해주세요. </h4>
                    </label>
                </>}

            </form>
        </div>
    )
}

export default Write ; 