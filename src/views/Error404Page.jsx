
import Header from '../components/Header';
import Error404 from '../components/Error404';
import Footer from '../components/Footer';
import { itemsMenu } from '../data/itemsMenu';

function Error404Page() {

    return (
        <>
            <Header itemsMenu={itemsMenu} />

            <Error404 />

            <Footer />
        </>
    );
}

export default Error404Page;
