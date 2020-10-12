import React, { Component, Fragment } from "react";
import Link from "next/link";
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from "../lib/utility";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    fetchDocumentFromCollectionByFieldName({
      value: this.props.userId,
      collectionName: "users",
      fieldName: "uid",
    }).then((user) => {
      if (!isEmpty(user)) {
        this.setState({ user });
      }
    });
  }

  render() {
    if (this.state.user === null) {
      return <span>User not found</span>;
    }

    return (
      <Fragment>
        <div>
          <figure className="image is-48x48">
            <img
              src={this.state.user.photo}
              alt="User profile photo"
              className="is-rounded"
            />
            <div>
              <p>{this.state.user.name}</p>
            </div>
          </figure>
        </div>
      </Fragment>
    );
  }
}
