import TimeAgo from "react-timeago";
var ColorHash = require("color-hash");
import UserInfo from "./UserInfo.js";

const deepSort = require(`deep-sort`);

var mime = require("mime-types");

export default (props) => {
  var colorHash = new ColorHash({});

  const leader = props.leader;
  const userId = leader.userId;
  const background_gradient =
    `linear-gradient(` +
    colorHash.hex(leader.userId) +
    "33," +
    colorHash.hex(leader.userId) +
    ")";
  delete leader.userId;
  const values = [];
  Object.entries(leader).forEach((action) => {
    const key = action[0];
    const value = action[1];
    const mymap = { name: key, value: value };

    values.push(mymap);
  });

  return (
    <section
      className="hero mb-6"
      style={{
        backgroundImage: background_gradient,
      }}
    >
      <div className="columns is-gapless hero-body mb-4">
        <div className="column mb-4">
          <UserInfo userId={userId} />
          <h2>Ranking: {props.index}</h2>
        </div>
        <div className="column is-10">
          <div className="content ">
            <h1 className="title "></h1>

            <h2 className="subtitle"></h2>
            {values.map((action) => (
              <div>
                {action.name} - {action.value}
              </div>
            ))}
            <div className="content"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
