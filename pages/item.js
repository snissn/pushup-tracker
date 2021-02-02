import React, { Component, useState, useEffect } from "react";
import base from "../lib/db";
import PushupList from "../components/PushupList";
import UserInfo from "../components/UserInfo";
import { auth, firebase, firestore } from "../lib/db";
import { useRouter } from "next/router";

export default (props) => {
  const [pushups, setPushups] = useState([]);
  const [user, setUser] = useState({});
  const [ref, setRef] = useState({});

  const router = useRouter();

  useEffect(() => {
    console.log(" ik", router.query);

    if (!router.query.post_id) {
      return;
    }
    setRef(
      base
        .get("pushups", {
          context: this,
          withIds: true,
          query: (ref) =>
            ref.where("__name__", "==", router.query.post_id).limit(1),
        })
        .then((pushups) => {
          if (true) {
            console.log("pushups", pushups);
            setPushups(pushups);
          }
        })
        .catch((error) => {
          console.log(`There was an error on fetching pushups ${error}`);
        })
    );

    return function () {
      base.removeBinding(ref);
    };
  }, [router]);

  // show activity
  // show profile
  // option to edit profile
  return (
    <div className=" columns">
      <div className="column is-11">
        <PushupList pushups={pushups} />
      </div>
    </div>
  );
};
