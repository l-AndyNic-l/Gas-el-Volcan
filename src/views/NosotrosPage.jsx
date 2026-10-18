import Footer from "../components/Footer"
import Header from "../components/Header"
import Nosotros from "../components/Nosotros"
import { itemsMenu } from "../data/itemsMenu"

function NosotrosPage() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />
                <Nosotros />
            <Footer itemsMenu={itemsMenu} />
        </>
    )
}

export default NosotrosPage