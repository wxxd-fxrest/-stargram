const Receive = ({coment}) => {
    // console.log(coment)
    // console.log(feed)
    return (
        <div>
            <h6> {coment.Data.SendName} </h6>
            <img src={coment.Data.SendPhotoURL} width="30px" height="30px" /> 
            <h4> {coment.Data.Coment} </h4>
        </div>
    )
}

export default Receive ; 