import { useNavigate } from "react-router-dom"
import { useIconsContext } from "../../contexts/Icon"

import Hero from "./components/Hero/Hero"
import AttributeComponent from "./components/AttributeComponent/AttributeComponent"
import Button from "../../components/Button/Button"


import "./Home.css"

const Home = () => {

  const navigate = useNavigate();

  const { BsPersonArmsUp, IoTimerOutline, FaSmileBeam } = useIconsContext()

  return <>
    <main className="home__main">
      <Hero />
      <section 
        className="home__section home__attributes"
      >
        <h1 className="home__heading">
          Our strenghts!
        </h1>
        <div className="attributes-container">
          <AttributeComponent
            title="Dedication"
            Icon={BsPersonArmsUp}
          >
            We have army of dedicated couriers to deliver you any products you want - from letters to big boxes!
          </AttributeComponent>
          <AttributeComponent
            title="Efficiency"
            Icon={IoTimerOutline}
          >
            Our couriers are trained and taught to deliver the packages as fast as it's possible! No time waste!
          </AttributeComponent>
          <AttributeComponent
            title="Sympathy"
            Icon={FaSmileBeam}
          >
            We hire only the nicest couriers out of all candidates. Customer service is very important to us!
          </AttributeComponent>
        </div>
        <div className="home__about-container">
          <Button
            role="button"
            type="primary"
            onClick={() => navigate("/about")}
          >
            More about us
          </Button>
        </div>
      </section>
    </main>
  </>
  
}

export default Home

