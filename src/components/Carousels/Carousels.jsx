import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";

function Carousels() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className="carouselContainer">
        <img
          src="/img/112.jpg"
          alt="First slide"
          style={{ overflow: "hidden", objectFit: "cover" }}
          height="450px"
        />
        <div className="carouseltext">
          <h1>Feature Books Of</h1>
          <h1>February</h1>
          <h2 className=" btn btn-primary bg-primary">Explore</h2>
        </div>
      </Carousel.Item>
      <Carousel.Item className="carouselContainer">
        <img
          src="/img/113.jpg"
          alt="First slide"
          style={{ overflow: "hidden", objectFit: "cover" }}
          height="450px"
        />
        <div className="carouseltext">
          <h1>Feature Books Of</h1>
          <h1>March</h1>
          <h2 className=" btn btn-primary bg-secondary">Explore</h2>
        </div>
      </Carousel.Item>
      <Carousel.Item className="carouselContainer">
        <img
          src="/img/114.jpg"
          alt="First slide"
          style={{ overflow: "hidden", objectFit: "cover" }}
          height="450px"
        />
        <div className="carouseltext">
          <h2>Reading is essential </h2>
          <h2>for those who seek to </h2>
          <h2>rise above the ordinary</h2>
          <h1> - Jim Rohn</h1>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
