import React, { Component, useState, useEffect } from "react";
import base from "../lib/db";
import { fetchCollectionDocs } from "../lib/utility.js";
import LeaderboardList from "../components/LeaderboardList";
const deepSort = require(`deep-sort`);
var arraySort = require("array-sort");

export default (props) => {
  const [isMounted, setMounted] = useState(false);
  const [leaders, setLeaders] = useState([]);

  function aggregate(data) {
    let detailed = {};
    data.forEach((row) => {
      const userId = row["userId"];
      if (!detailed[userId]) {
        detailed[userId] = { "Total Actions": 0, userId: userId };
      }

      const activity = row["activity"];
      if (!detailed[userId][activity]) {
        detailed[userId][activity] = 0;
      }
      const count = parseInt(row["count"] || 0);
      detailed[userId][activity] += count;
      detailed[userId]["Total Actions"] += count;
    });
    //const x = deepSort.object(detailed, `Total Actions`, "desc");
    const sorted = arraySort(Object.values(detailed), "Total Actions", {
      reverse: true,
    });
    return sorted;
  }

  useEffect(() => {
    fetchCollectionDocs("pushups").then((pushups) => {
      if (!isMounted) {
        const sorted = aggregate(pushups);
        setLeaders(sorted);
        setMounted(true);
      }
    });
  });

  return <LeaderboardList leaders={leaders} />;
};
