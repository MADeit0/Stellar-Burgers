import { useParams } from "react-router-dom";
import feedStyle from "./FeedDetails.module.css";

// import { useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";

// const textStyle = "text text_type_main-default text_color_inactive";

const FeedDetails = () => {
  const { orderId } = useParams();
  console.log(orderId)
  // const { orderId } = useParams();
  // const location = useLocation();

  // const background = location.state && location.state.background;

  return <div className={feedStyle.container}>123</div>;
};

export default FeedDetails;
