const DirectMessage = ({loginMessage}) => {

    return (
        <div className="DirectMessage">
            {loginMessage.Data.SendUID ?
            <div>
                <h3>{loginMessage.Data.SendName}</h3>
                <div className="Dm_your">
                    <h6>{loginMessage.Data.sendMessage}</h6>
                </div>
            </div> : <div className="Dm_mine">
                <h6>{loginMessage.Data.sendMessage}</h6>
            </div>}
        </div>
    )
}

export default DirectMessage ; 