import DetalleProducto from "../components/DetalleProducto"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { itemsMenu } from "../data/itemsMenu"

function DetallePorductosPage() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />
                <DetalleProducto />
            <Footer itemsMenu={itemsMenu} />
        </>
    )
}

export default DetallePorductosPage