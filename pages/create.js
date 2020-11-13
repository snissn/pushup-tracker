import React, { Component, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import base from "../lib/db";
import { auth } from "../lib/db";
import * as firebase from "firebase";
import { useRouter } from "next/router";
import Select from "react-select";

import ImageUpload from "../components/ImageUpload.js";
import ReactPlayer from "react-player";

export default function Create() {
  const router = useRouter();
  const options = [
    { value: "Pushup", label: "Push Ups" },
    { value: "Sit Up", label: "Sit Ups" },
    { value: "Youtube Video", label: "Youtube Video", showExtra: "youtube" },

    { value: "Diamond Pushup", label: "Diamond Push Ups" },

    { value: "Lizard Pushup", label: "Lizard Push Ups", showExtra: "sides" },
    { value: "Archer Pushup", label: "Archer Push Ups", showExtra: "sides" },
    {
      value: "Flying Crow Pushup",
      label: "Flying Crow Pushups",
      showExtra: "sides",
    },
    {
      value: "One Handed Pushup",
      label: "One Handed Push Ups",
      showExtra: "sides",
    },
    { value: "Sun Salutation A", label: "Sun Salutation A" },
    { value: "Sun Salutation B", label: "Sun Salutation B" },
  ];

  const sides = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      count: 0,
      activity: options[0].value,
      showExtra: false,
      url: null,
    },
  });

  const [showExtra, setExtra] = useState(undefined);

  const [displayURL, setDisplayURL] = useState(false);

  const onSubmit = (data) => {
    data["userId"] = window.user.uid;
    delete data[""];
    data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp();
    console.log("DATA---", data);
    base.addToCollection("pushups", data).then(function () {
      router.push("/feed");
    });
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <div className="field">
          <label className="label">Activity</label>
          <div className="input select is-large is-fullwidth">
            <Select
              styles={{
                control: () => ({}),
                indicatorsContainer: () => ({
                  display: "none",
                }),
                valueContainer: () => ({}),
              }}
              options={options}
              ref={register}
              defaultValue={options[0]}
              blurInputOnSelect={true}
              isSearchable={false}
              onChange={(data) => {
                setValue("activity", data["value"]);
                setExtra(data.showExtra);
              }}
            />
            <input
              name="activity"
              type="hidden"
              ref={register({ required: true })}
            />
            <input name="url" type="hidden" ref={register} />
          </div>
        </div>
        {showExtra && showExtra == "youtube" && (
          <div className="field">
            <label className="label">Youtube Video URL</label>

            <div className="input radio is-large is-fullwidth">
              <div className="control">
                <input
                  className="input"
                  name="url"
                  ref={register}
                  onChange={(data) => {
                    setDisplayURL(data.target.value);
                  }}
                />
              </div>
            </div>
            {displayURL && <ReactPlayer url={displayURL} />}
          </div>
        )}

        {showExtra && showExtra == "sides" && (
          <div className="field">
            <label className="label">Side</label>
            <div className="input radio is-large is-fullwidth">
              <div className="control">
                <label className="button is-link">
                  <input
                    checked
                    type="radio"
                    name="side"
                    value="Left"
                    ref={register}
                  />
                  Left
                </label>
                <label className="button is-link ml-4">
                  <input
                    type="radio"
                    name="side"
                    value="Right"
                    ref={register}
                  />
                  Right
                </label>
              </div>
            </div>
          </div>
        )}

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
          <div className="control    mt-4">
            <ImageUpload data={{ register, setValue }} />
          </div>
        </div>
        <div className="field is-grouped ">
          <div className="control    mt-4">
            <button className="button is-link">Submit</button>
          </div>

          <div className="control  mt-4">
            <button
              onClick={() => router.push("/")}
              className="button is-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
