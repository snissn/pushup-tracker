import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import getConfig from 'next/config';
import { auth } from '../lib/db';

const { publicRuntimeConfig } = getConfig();

export default class TheNav extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      isActive: false,
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
    Router.push('/');
  };

  componentDidMount() {
    this._isMounted = true;
    auth.onAuthStateChanged((user) => {
      console.log('USER', user);
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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand is-active">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>

          {this.state.signedIn ? (
            <Link href="/create">
              <a className="navbar-item">Log Pushup</a>
            </Link>
          ) : null}
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => {
              this.setState({ isActive: !this.state.isActive });
            }}
            className={`navbar-burger burger ${
              this.state.isActive ? 'is-active' : ''
            }`}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${this.state.isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.state.signedIn ? (
                  <a className="button is-danger" onClick={this.signOut}>
                    <strong>Sign out</strong>
                  </a>
                ) : (
                  <Link href="/signin">
                    <a className="button is-primary">
                      <strong>Sign in</strong>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
