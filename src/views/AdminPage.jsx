
import Header from '../components/Header';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import { itemsMenu } from '../data/itemsMenu';

function AdminPage() {
    return (
        <>
            <Header itemsMenu={itemsMenu} />
            <Admin />
            <Footer itemsMenu={itemsMenu} />
        </>
    );
}

export default AdminPage;
