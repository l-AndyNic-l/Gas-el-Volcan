import Footer from "../components/Footer"
import Header from "../components/Header"
import { itemsMenu } from "../data/itemsMenu"
import Favorito from "../components/Favorito"

function FavoritoPage() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />
                <Favorito />
            <Footer itemsMenu={itemsMenu} />
        </>
    )
}

export default FavoritoPage