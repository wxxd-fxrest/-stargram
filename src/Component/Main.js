const Main = ({feed}) => {
    // console.log(feed)

    const feedAll = () => {
        let arr = [] ;
        if(feed) {
            for(let i = 0; i < feed.length; i++) {
                arr.push(
                    <div key={i}>
                    {feed ? 
                        <div className="Main">
                            <h6> {feed[i].displayName} </h6>
                            <img alt="" src={feed[i].attachmentUrl} width="200px" height="200px" />
                            <h5> {feed[i].message} </h5>
                        </div> : null }
                    </div>
                )
            }
        }
        return arr ;
    }

    return (
        <div>
            {feedAll()}
        </div>
    )
}

export default Main ; 