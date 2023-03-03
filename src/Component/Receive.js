const Receive = ({coment, feed}) => {
    // console.log(coment)
    // console.log(feed)
    return (
        <div>
            <h6> {coment.Data.SendName} </h6>
            <h4> {coment.Data.Coment} </h4>
        </div>
    )
}

export default Receive ; 