import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import {itemsMenu} from '../data/itemsMenu'

function HomePage() {
    return (
        <>
            <Header itemsMenu={itemsMenu}/>
            <Main />
            <Footer itemsMenu={itemsMenu}/>
        </>
    )
}

export default HomePage