import PushupList from "./PushupList.js";
import React, { Component, useState, useEffect } from "react";
import base from "../lib/db";

export default (props) => {
  const [pushups, setPushups] = useState([]);

  useEffect(() => {
    console.log("PROPS", props);
    //dead code
    if (props.userId) {
      window.alert("1");
      const ref = base
        .get("pushups", {
          context: this,
          withIds: true,
          query: (ref) =>
            ref
              .where("userId", "==", props.userId)
              .limit(500)
              .orderBy("createdAt", "desc"),
        })
        .then((pushups) => {
          setPushups(pushups);
        });
    }
  });
  return (
    <div className="container">
      <h1 className="title">Activity</h1>
      <PushupList pushups={pushups} />
    </div>
  );
};
