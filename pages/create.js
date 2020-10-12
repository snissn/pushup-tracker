import React, { Component, Fragment } from "react";
import { useForm } from "react-hook-form";
import base from "../lib/db";
import { auth } from "../lib/db";
import * as firebase from "firebase";
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    getValues,
  } = useForm({ defaultValues: { count: 0 } });
  const onSubmit = (data) => {
    data["userId"] = window.user.uid;
    data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp();

    console.log("data", data);

    base.addToCollection("pushups", data).then(function () {
      router.push("/");
    });
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <div className="field">
          <label className="label">Activity</label>
          <div className="select is-large is-fullwidth">
            <select name="activity" ref={register}>
              <option value="Pushup">Push Ups</option>
              <option value="Lizard Pushup">Lizard Push Ups</option>
              <option value="Archer Pushup">Archer Push Ups</option>
              <option value="Sun Salutation A">Sun Salutation A</option>
              <option value="Sun Salutation B">Sun Salutation B</option>
            </select>
          </div>
        </div>

        {/* include validation with required or other standard HTML validation rules */}

        <div className="field">
          <label className="label">Count</label>
          <div className="control is-fullwidth">
            <input
              className="input is-large"
              name="count"
              ref={register({ required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.count && <span>This field is required</span>}{" "}
          </div>
        </div>
        <div className="field">
          <div className="control  mt-4">
            <button
              onClick={(e) => {
                setValue("count", parseInt(getValues("count")) + 5);
                e.preventDefault();
                return false;
              }}
              className="button is-link m-1"
            >
              +5
            </button>
            <button
              onClick={(e) => {
                setValue("count", parseInt(getValues("count")) + 1);
                e.preventDefault();
                return false;
              }}
              className="button is-link m-1"
            >
              +1
            </button>
            <button
              onClick={(e) => {
                setValue(
                  "count",
                  Math.max(0, parseInt(getValues("count")) - 1)
                );
                e.preventDefault();
                return false;
              }}
              className="button is-link m-1"
            >
              -1
            </button>
            <button
              onClick={(e) => {
                setValue(
                  "count",
                  Math.max(0, parseInt(getValues("count")) - 5)
                );
                e.preventDefault();
                return false;
              }}
              className="button is-link m-1"
            >
              -5
            </button>
          </div>
        </div>

        <div className="field is-grouped ">
          <div className="control is-primary is-link  mt-4">
            <button className="button is-primary">Submit</button>
          </div>
          <div className="control  mt-4">
            <button onClick={() => router.push("/")} className="button is-link">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
