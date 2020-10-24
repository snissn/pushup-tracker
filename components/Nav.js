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
        <div className="navbar-brand is-pulled-left">
          <Link href="/">
            <a className="navbar-item button m-1">Home</a>
          </Link>
          <Link href="/leaderboard">
            <a className="navbar-item button m-1">Leaderboard</a>
          </Link>

          {this.state.signedIn ? (
            <Link href="/create">
              <a className="navbar-item button m-1">Log Pushup</a>
            </Link>
          ) : null}
        </div>
        <div className="navbar-item is-pulled-right">
          <div className="buttons">
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
        </div>
      </nav>
    );
  }
}
