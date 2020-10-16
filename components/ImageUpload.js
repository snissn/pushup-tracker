import React, { Component, useState, useEffect } from "react";
import { storage } from "../lib/db";

export default (props) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleUpload = () => {
    console.log("image", image);
    if (!image) {
      alert("null image");
      return;
    }
    const uploadFileName = `users/${window.user.uid}/${image.name}`;
    const uploadTask = storage.ref(uploadFileName).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        console.log("url", uploadFileName);
        // complete function ...
        storage
          .ref(uploadFileName)
          .getDownloadURL()
          .then((url) => {
            props.data.setValue("url", url);

            setUrl(url);
          });
      }
    );
  };

  if (image && progress == 0) {
    handleUpload();
  }

  return (
    <div className="center">
      <div className="file has-name is-boxed">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            onChange={handleChange}
            ref={props.data.register}
          />
          <span className="file-cta has-background-link has-text-white">
            <span className="file-icon">
              <i className="fas fa-upload "></i>
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
        </label>
      </div>

      {progress > 0 && progress < 100 && (
        <div className="row">
          <progress value={progress} max="100" className="progress" />
        </div>
      )}
      {url && <img src={url} alt="Uploaded Images" height="300" width="400" />}
    </div>
  );
};
