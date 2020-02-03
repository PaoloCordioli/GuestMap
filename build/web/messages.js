const { Marker, Popup } = window.ReactLeaflet

class Message extends React.Component {

    createMarker = (mes) => {
        console.log("sono mes",mes.lat)
        let position = [mes.lat,mes.lon]
        return <Marker position={position}><Popup><span>{mes.content}</span></Popup></Marker>
    }

    createListMessages = () => {
        if (this.props.message === "null"){
            return <div></div>
        }else{
            return this.props.message.map(this.createMarker)
        }
    }

    render() {
        return(
            this.createListMessages()
        )
    }
}