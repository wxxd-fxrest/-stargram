import { useNavigate } from "react-router-dom";

const YourProfile = ({feedUser}) => {
    const navigate = useNavigate();

    return(
        <div className="YourProfile">
            {feedUser ? 
            <div className="YourProfile_goFeed">
                <img src={feedUser.Data.attachmentUrl} 
                    onClick={(() => {
                        navigate(`/feed/${feedUser.Data.UID}/${feedUser.DocID}`)
                    })}/> 
            </div> : null}
        </div>
    )
}

export default YourProfile ; 