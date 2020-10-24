import "../styles/globals.css";
import Nav from "../components/Nav.js";
import "../assets/sass/styles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script
        defer
        src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"
      ></script>

      <Nav></Nav>
      <div style={{ clear: "both" }}></div>

      <section style={{ clear: "both" }}>
        <Component {...pageProps} />
      </section>
    </>
  );
}

export default MyApp;
