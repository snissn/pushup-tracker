import React, { Component, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from "../lib/utility";

export default (props) => {
  const [user, setUser] = useState(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!props.userId) {
      return;
    }
    fetchDocumentFromCollectionByFieldName({
      value: props.userId,
      collectionName: "users",
      fieldName: "uid",
    }).then((user) => {
      if (!mount) {
        setUser(user);
        setMount(true);
      }
    });
  });

  if (user === null) {
    return <span>User not found</span>;
  }

  return (
    <Fragment>
      <div>
        <figure className="image is-48x48">
          <img
            src={user.photo}
            alt="User profile photo"
            className="is-rounded"
          />
        </figure>

        <p className="mt-4 is-primary">
          <Link
            href={{
              pathname: "/you",
              query: { user_id: user.uid },
            }}
          >
            <a className="is-size-4	has-text-weight-bol">{user.name}</a>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};
