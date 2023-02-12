export default function Photo(){
    return(
        <div style={{
            "width":"100%",
            "height":"100%",
            "backgroundColor":"#777",
            "borderRadius":"1rem",
            "display":"flex",
            "flexDirection":"column",
            "justifyContent":"center",
            "alignItems":"center"
        }}>
        <img width="300px" src="https://media.giphy.com/media/42NygjAvK6YT3Ld95N/giphy.gif" alt="friends"></img>
        <h1 className="display-5" style={{"color":"white"}}>Chat With Your Friends</h1>
        <h1 className="display-5" style={{"color":"white"}}>With ReactChatWeb</h1>
        </div>
    )
}