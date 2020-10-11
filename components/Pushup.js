import TimeAgo from 'react-timeago';
const stc = require('string-to-color');
var ColorHash = require('color-hash');

export default (props) => {
  var colorHash = new ColorHash({ saturation: 0.15 });

  const pushup = props.pushup;
  const thing =
    `linear-gradient(` +
    colorHash.hex(pushup.userId) +
    '33,' +
    colorHash.hex(pushup.userId) +
    'bb)';
  console.log('thing', thing);
  return (
    <section
      className="hero mb-6"
      style={{
        color: 'blue',
        'background-image': thing,
      }}
    >
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {pushup.count} {pushup.activity}s
          </h1>

          <h2 className="subtitle">
            <TimeAgo date={pushup.createdAt.toDate()} />
          </h2>
          <div>user: {pushup.userId}</div>
        </div>
      </div>
    </section>
  );
};
