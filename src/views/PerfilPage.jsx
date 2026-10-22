import Header from '../components/Header';
import Perfil from '../components/Perfil';
import Footer from '../components/Footer';
import { itemsMenu } from '../data/itemsMenu';

function PerfilPage() {
    return (
        <>
            <Header itemsMenu={itemsMenu} />
                <Perfil />
            <Footer />
        </>
    );
}

export default PerfilPage;
