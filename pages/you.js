import React, { Component } from "react";
import base from "../lib/db";
import PushupList from "../components/PushupList";
import UserInfo from "../components/UserInfo";
import { auth, firebase, firestore } from "../lib/db";

export default class Index extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = { pushups: [], user: {} };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
    });

    this._isMounted = true;
    this.ref = base
      //.where("userId", "==", this.state.user.uid)
      .get("pushups", {
        context: this,
        withIds: true,
        query: (ref) => ref.orderBy("createdAt", "desc"),
        where: [["userId", "==", this.state.user.uid]],
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
    // show activity
    // show profile
    // option to edit profile
    return (
      <div>
        <UserInfo user={this.state.user.uid} />
        <PushupList pushups={this.state.pushups} />
      </div>
    );
  }
}
