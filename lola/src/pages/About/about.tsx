import AboutHeader from '../../components/AboutHeader/aboutHeader'
import AboutHistory from '../../components/AboutHistory/aboutHistory'
import AboutFeatures from '../../components/AboutFeatures/aboutFeatures'
import AboutPrinciples from '../../components/AboutPrinciples/aboutPrinciples'
import AboutContact from '../../components/AboutContact/aboutContact'
import './about.css'

const About = () => {
  return (
    <div className="about">
      <AboutHeader />
      <div className="about-container">
        <AboutHistory />
        <AboutFeatures />
        <AboutPrinciples />
        <AboutContact />
      </div>
    </div>
  )
}

export default About
