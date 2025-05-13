import Header from '../components/presentationPage/Header'
import Navbar from '../components/presentationPage/Navbar'
import Home from '../components/presentationPage/Home'
import About from '../components/presentationPage/About'
import Features from '../components/presentationPage/Features'
import Pricing from '../components/presentationPage/Pricing'
import Contact from '../components/presentationPage/Contact'
import FAQ from '../components/presentationPage/FAQ'
import Footer from '../components/presentationPage/Footer'

const PresentationPage = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <Home />
            <About />
            <Features />
            <Pricing />
            <Contact />
            <FAQ />
            <Footer />
        </div>
    )
}

export default PresentationPage
