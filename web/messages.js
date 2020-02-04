const { Marker, Popup } = window.ReactLeaflet

class Message extends React.Component {

    delete = (id) => {
        this.props.delete(id)
    }

    createMarker = (mes) => {
        return <Marker key={mes.id} position={[mes.lat, mes.lon]}><Popup><span>{mes.content} <span></span>
            <button type="button" className="border border-light" onClick={()=> this.delete(mes.id)} > <img src='./icons/trash.svg' alt="" width="20" height="20"></img>
            </button></span></Popup></Marker>
    }

    createListMessages = () => {
        if (this.props.message === []) {
            return <div></div>
        } else {
            return this.props.message.map(this.createMarker)
        }
    }

    render() {
        return (
            this.createListMessages()
        )
    }
}