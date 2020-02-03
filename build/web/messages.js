const { Marker, Popup } = window.ReactLeaflet

class Message extends React.Component {

    createMarker = (mes) => {
        return <Marker key={mes.id} position={[mes.lat,mes.lon]}><Popup><span>{mes.content}</span></Popup></Marker>
    }

    createListMessages = () => {
        if (this.props.message === []){
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