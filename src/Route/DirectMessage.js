const DirectMessage = ({loginMessage}) => {

    return (
        <div>
            {loginMessage.Data.SendUID ?
            <div style={{backgroundColor:"skyblue"}}>
                <p>{loginMessage.Data.SendName}</p>
                <p>{loginMessage.Data.sendMessage}</p>
            </div> : <div style={{backgroundColor:"pink"}}>
                <p>{loginMessage.Data.sendMessage}</p>
            </div>}
        </div>
    )
}

export default DirectMessage ; 