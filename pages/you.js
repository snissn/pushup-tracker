import React, { Component, useState, useEffect } from "react";
import base from "../lib/db";
import PushupList from "../components/PushupList";
import UserInfo from "../components/UserInfo";
import { auth, firebase, firestore } from "../lib/db";
import { useRouter } from "next/router";

export default (props) => {
  const [_isMounted, setMount] = useState(false);
  const [pushups, setPushups] = useState([]);
  const [user, setUser] = useState({});
  const [ref, setRef] = useState({});

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setMount(true);
      if (!router.query.user_id) {
        return;
      }
      console.log("Router", router.query.user_id);
      setRef(
        base
          .get("pushups", {
            context: this,
            withIds: true,
            query: (ref) =>
              ref
                .where("userId", "==", router.query.user_id)
                .limit(500)
                .orderBy("createdAt", "desc"),
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
    });
  }, [user]);

  function componentWillUnmount() {
    setMount(false);
    base.removeBinding(ref);
    setRef({});
  }

  // show activity
  // show profile
  // option to edit profile
  return (
    <div className=" columns">
      <div className="column is-1">
        <UserInfo userId={router.query.user_id} />
      </div>
      <div className="column is-11">
        <PushupList pushups={pushups} />
      </div>
    </div>
  );
};
