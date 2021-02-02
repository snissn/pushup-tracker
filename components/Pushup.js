import TimeAgo from "react-timeago";
import ReactPlayer from "react-player";
import Link from "next/link";

var ColorHash = require("color-hash");
import UserInfo from "./UserInfo.js";
var mime = require("mime-types");

export default (props) => {
  var colorHash = new ColorHash({ lightness: 0.93, saturation: 1 });

  const pushup = props.pushup;
  let media_type = "";
  if (pushup.url) {
    try {
      media_type = mime.lookup(pushup.url.split("?")[0]).split("/")[0];
    } catch (e) {}
  }

  const background_gradient =
    `linear-gradient(` +
    colorHash.hex(pushup.userId) +
    "," +
    colorHash.hex(pushup.userId) +
    ")";
  return (
    <section
      className="hero mb-6"
      style={{
        backgroundImage: background_gradient,
      }}
    >
      <div className="columns is-gapless hero-body mb-4">
        <div className="column mb-4">
          <UserInfo userId={pushup.userId} />
        </div>
        <div className="column is-10">
          <div className="content ">
            <h1 className="title ">
              {pushup.count} {pushup.side} {pushup.activity}s
            </h1>

            <h2 className="subtitle">
              <TimeAgo date={pushup.createdAt.toDate()} />
            </h2>
            <div className="content">
              {media_type == "image" && (
                <img src={pushup.url} width="400" height="300" />
              )}
              {media_type == "video" && (
                <video
                  controls
                  width="400"
                  height="300"
                  controls="controls"
                  preload="metadata"
                >
                  <source src={pushup.url + "#t=0.5"} type="video/mp4" />
                </video>
              )}
              {pushup.activity == "Youtube Video" && pushup.url && (
                <ReactPlayer width="100%" url={pushup.url} />
              )}

              <Link
                href={{
                  pathname: "/item",
                  query: { post_id: pushup.id },
                }}
              >
                <a className="is-size-4	has-text-weight-bol">link</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
