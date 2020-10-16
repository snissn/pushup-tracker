import React, { Component } from "react";
import base from "../lib/db";
import PushupList from "../components/PushupList";

export default class Index extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { pushups: [] };
  }

  componentDidMount() {
    this._isMounted = true;
    this.ref = base
      .get("pushups", {
        context: this,
        withIds: true,
        query: (ref) => ref.orderBy("createdAt", "desc"),
      })
      .then((pushups) => {
        if (this._isMounted) {
          console.log("pushups", pushups);
          this.setState({ pushups });
        }
      })
      .catch((error) => {
        console.log(`There was an error on fetching pushups ${error}`);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    return <PushupList pushups={this.state.pushups} />;
  }
}
