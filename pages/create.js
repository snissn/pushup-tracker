import React, { Component, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import base from '../lib/db';
import { auth } from '../lib/db';
import * as firebase from 'firebase';

import * as NumericInput from 'react-numeric-input';

import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();

  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = (data) => {
    data['userId'] = window.user.uid;
    data['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();

    console.log('data', data);

    base.addToCollection('pushups', data).then(function () {
      router.push('/');
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
              <option value="Sun-Salutation-A">Sun Salutation A</option>
              <option value="Sun-Salutation-B">Sun Salutation B</option>
            </select>
          </div>
        </div>

        {/* include validation with required or other standard HTML validation rules */}

        <div className="field">
          <label className="label">Count</label>
          <div className="control is-fullwidth">
            <NumericInput
              className="input is-fullwidth"
              value={1}
              style={{
                wrap: {
                  boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                  padding: '2px 2.26ex 2px 2px',
                  borderRadius: '6px 3px 3px 6px',
                  fontSize: 28,
                },
                span: {
                  width: '100% !important',
                },
                input: {
                  borderRadius: '4px 2px 2px 4px',
                  border: '1px solid #ccc',
                  display: 'block',
                  fontWeight: 400,
                  textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                  'padding-left': '16px !important',
                },
                'input:focus': {
                  border: '1px inset #69C',
                  outline: 'none',
                },
                arrowUp: {},
                arrowDown: {},
              }}
              onChange={(val) => {
                setValue('count', val);
              }}
            />
            <input
              className="input"
              name="count"
              type="hidden"
              ref={register({ required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.count && <span>This field is required</span>}{' '}
          </div>
        </div>
        <style jsx>
          {`
            span.react-numeric-input {
              width: '100%';
              paddingright: 0;
              color: 'red';
            }
          `}
        </style>

        <div className="field is-grouped mt-4">
          <div className="control">
            <button className="button">Submit</button>
          </div>
          <div className="control">
            <button
              onClick={() => router.push('/')}
              className="button is-link is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
