import React, { Component, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import getConfig from "next/config";
import { auth } from "../lib/db";

const { publicRuntimeConfig } = getConfig();

export default class TheNav extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  signOut = async () => {
    await auth.signOut();
    localStorage.removeItem(publicRuntimeConfig.localStorageUserId);
    if (this._isMounted) {
      this.setState({
        signedIn: false,
      });
    }
    Router.push("/");
  };

  componentDidMount() {
    this._isMounted = true;
    auth.onAuthStateChanged((user) => {
      console.log("USER", user);
      if (user) {
        window.user = user;
        // signed in
        if (this._isMounted) {
          this.setState({
            signedIn: true,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-item is-pulled-left">
          <Link href="/">
            <a className=" button ">Home</a>
          </Link>
        </div>
        <div className="navbar-item is-pulled-left">
          <Link href="/feed">
            <a className=" button ">Feed</a>
          </Link>
        </div>
        <div className="navbar-item is-pulled-left">
          <Link href="/leaderboard">
            <a className=" button ">Leaderboard</a>
          </Link>
        </div>
        <div className="navbar-item is-pulled-left">
          {this.state.signedIn ? (
            <Link href="/create">
              <a className=" button ">Log Pushup</a>
            </Link>
          ) : null}
        </div>

        <div className="navbar-item is-pulled-left">
          {this.state.signedIn ? (
            <a className="button is-danger" onClick={this.signOut}>
              <strong>Logout</strong>
            </a>
          ) : (
            <Link href="/login">
              <a className="button is-primary">
                <strong>Login</strong>
              </a>
            </Link>
          )}
        </div>
        {this.state.signedIn ? (
          <div className="navbar-item is-pulled-left">
            <a
              className="button is-info"
              href={"/you?user_id=" + window.user.uid}
            >
              <strong>Your Profile</strong>
            </a>
          </div>
        ) : (
          <></>
        )}
      </nav>
    );
  }
}
