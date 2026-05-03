import { Route, Routes } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

import './App.css'
import Hero3 from './components/Hero/Hero3'
import Header from './components/Header/header'
import Section2 from './components/Highlights/Highlights'
import Faculty from './components/Faculty/Faculty'
import Placements from './components/Placements/Placements'
import Placements2 from './components/Placements/Placements2'
import PlacementsPage from './components/Placements/PlacementsPage'
import VoicesOfExcellence from './components/VoicesOfExcellence/VoicesOfExcellence'
import Footer from './components/Footer/footer'
import Research from './components/Research/Research '
import Clubs from './components/Clubs/Clubs'
import ClubDetails from './components/Clubs/ClubDetails'
import Gallery from './components/Gallery/Gallery'
import FacultyDetails from './components/Faculty/FacultyDetails'
import ScrollToTop from './components/ScrollToTop'

function HomePage() {
  return (
    <>
      <Hero3 />
      <Section2 />
      <Faculty />
      <Placements />
      <Placements2 />
      <VoicesOfExcellence />
      <Research />
      <Clubs />
    </>
  )
}

function App() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.08,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        gestureOrientation: 'vertical',
        anchors: { offset: -90 },
        allowNestedScroll: true,
      }}
    >
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/clubs/:clubSlug" element={<ClubDetails />} />
        <Route path="/faculty/:facultySlug" element={<FacultyDetails />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </ReactLenis>
  )
}

export default App
