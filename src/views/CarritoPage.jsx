import Footer from "../components/Footer"
import Header from "../components/Header"
import { itemsMenu } from "../data/itemsMenu"
import Carrito from '../components/Carrito'


function CarritoPage(){
    
    return (
        <>
            <Header itemsMenu={itemsMenu}/>
                <Carrito />
            <Footer itemsMenu={itemsMenu}/>
        </>
    )

}

export default CarritoPage