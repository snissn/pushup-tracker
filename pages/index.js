import React, { Component, useState, useEffect } from "react";
import base from "../lib/db";
import { fetchCollectionDocs } from "../lib/utility.js";
import PushupList from "../components/PushupList";

export default (props) => {
  const [isMounted, setMounted] = useState(false);
  const [pushups, setPushups] = useState([]);

  useEffect(() => {
    fetchCollectionDocs("pushups").then((pushups) => {
      if (!isMounted) {
        setPushups(pushups);
        setMounted(true);
      }
    });
  });

  return <PushupList pushups={pushups} />;
};
