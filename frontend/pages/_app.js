import App, { Container } from "next/app";
import Cookies from "js-cookie";
import nookies from "nookies";
import axios from "axios";
import cookies from "next-cookies";
import { apiEndpoint } from "../config";
import Page from "../components/Page";
import UserContext from "../components/UserContext";
import { auth } from "../util/auth"

axios.defaults.baseURL = apiEndpoint;
axios.defaults.withCredentials = true;
axios.defaults["xsrfCookieName"] = "csrf_access_token";
axios.defaults["xsrfHeaderName"] = "X-CSRF-TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = await auth(ctx)
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // pageProps.query = ctx.query;

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;
    return (
      <Container>
        <UserContext.Provider value={{ user }}>
          <Page>
            <Component {...pageProps} user={user} />
          </Page>
        </UserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
