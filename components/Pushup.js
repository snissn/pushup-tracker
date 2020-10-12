import TimeAgo from "react-timeago";
var ColorHash = require("color-hash");
import UserInfo from "./UserInfo.js";

export default (props) => {
  var colorHash = new ColorHash({});

  const pushup = props.pushup;
  const background_gradient =
    `linear-gradient(` +
    colorHash.hex(pushup.userId) +
    "33," +
    colorHash.hex(pushup.userId) +
    ")";
  return (
    <section
      className="hero mb-6"
      style={{
        backgroundImage: background_gradient,
      }}
    >
      <div className="columns hero-body">
        <div className="column container is-2">
          <UserInfo userId={pushup.userId} />
        </div>
        <div className="column">
          <div className="content">
            <h1 className="title">
              {pushup.count} {pushup.activity}s
            </h1>

            <h2 className="subtitle">
              <TimeAgo date={pushup.createdAt.toDate()} />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
