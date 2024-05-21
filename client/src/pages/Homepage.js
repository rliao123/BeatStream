import Header from "../components/Header";
import HomepageComponent1 from "../components/HomepageComponent1";
import HomepageComponent2 from "../components/HomepageComponent2";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <HomepageComponent1 />
      <HomepageComponent2 />
    </div>
  );
};

export default Homepage;
