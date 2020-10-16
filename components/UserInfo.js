import React, { Component, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from "../lib/utility";

export default (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!props.userId) {
      return;
    }
    fetchDocumentFromCollectionByFieldName({
      value: props.userId,
      collectionName: "users",
      fieldName: "uid",
    }).then((user) => {
      if (!isEmpty(user)) {
        setUser(user);
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
          <p className="mt-4 is-primary">
            <Link
              href={{
                pathname: "/you",
                query: { user_id: user.uid },
              }}
            >
              <a>{user.name}</a>
            </Link>
          </p>
        </figure>
      </div>
    </Fragment>
  );
};
