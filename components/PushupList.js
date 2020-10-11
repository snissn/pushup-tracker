import Pushup from './Pushup.js';
export default (props) => (
  <div className="container">
    {props.pushups.map((pushup) => (
      <div className="container">
        <Pushup pushup={pushup} />
      </div>
    ))}
  </div>
);
