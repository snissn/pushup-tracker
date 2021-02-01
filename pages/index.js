export default (props) => {
  return (
    <div>
      <div class="hero  is-primary is-medium  ">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Welcome to Pushup Site!</h1>
          </div>
        </div>
      </div>
      <section class="hero is-info is-medium">
        <div class="hero-body is-link">
          <div class="container has-text-centered">
            <h1 class="title">
              Challenge yourself and the world to see how many pushups you can
              do!
            </h1>
          </div>
        </div>
      </section>
      <section class="hero is-primary is-medium">
        <div class="hero-body is-link">
          <div class="container has-text-centered">
            <h1 class="title">
              Do a set of pushups now, then Login to create an account and log
              your pushup set!
            </h1>
          </div>
        </div>
      </section>
      <section class="hero is-link is-medium">
        <div class="hero-body ">
          <div class="container has-text-centered">
            <h1 class="title">
              Upload photos or videos of your pushups and learn exciting push up
              variations!
            </h1>
          </div>
        </div>
      </section>

      <section className="hero is-primary is-medium">
        <div className="hero-body ">
          <div className="container has-text-centered ">
            <h1 className="title">This app is open source!</h1>
            <h2 className="subtitle m-1">
              <a
                className="button m-1 is-link"
                href="https://github.com/snissn/pushup-tracker"
                target="_ blank"
              >
                View the source on Github
              </a>
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};
