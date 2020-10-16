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
      <section className="section ">
        <Component {...pageProps} />
      </section>
    </>
  );
}

export default MyApp;
