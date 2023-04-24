import "./Eventcard.css";

function Eventcarddata(props) {
  return (
    <div className="e-card text-center">
      <div className="e-image">
        <img src={props.image} alt="image" />
      </div>
      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div>
  );
}

export default Eventcarddata;
