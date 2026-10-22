import Productos from "../components/Productos"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { itemsMenu } from "../data/itemsMenu"


function ProductosPage() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />
                <Productos />
            <Footer itemsMenu={itemsMenu} />
        </>
    )
}

export default ProductosPage