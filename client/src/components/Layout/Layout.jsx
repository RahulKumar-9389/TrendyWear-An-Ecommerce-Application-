import { Helmet } from "react-helmet";
import Header from './Header'
import Footer from './Footer'

const Layout = ({ title, children }) => {
    return <>
        <Helmet>
            <meta charSet="UTF-8" />
            <meta name="description" content="Mern Stack E-Commerce Web App" />
            <meta name="keywords" content="HTML, CSS, JavaScript, React, Node, Express" />
            <meta name="author" content="RahulKumar" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title ? `TrendyWear - ${title}` : 'TrendyWear'}</title>
        </Helmet>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>
};

export default Layout;