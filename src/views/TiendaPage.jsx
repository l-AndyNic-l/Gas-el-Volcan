
import Header from '../components/Header';
import Tienda from '../components/Tienda';
import Footer from '../components/Footer';
import { itemsMenu } from '../data/itemsMenu';

function TiendaPage() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />

            <Tienda />

            <Footer />
        </>
    );
}

export default TiendaPage;
