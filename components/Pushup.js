import TimeAgo from 'react-timeago';

export default (props) => {
  const pushup = props.pushup;
  return (
    <section className="hero is-primary is-bold  mb-6">
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
