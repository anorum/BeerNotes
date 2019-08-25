import App, { Container } from "next/app";
import Cookies from "js-cookie";
import nookies from "nookies";
import axios from "axios";
import cookies from "next-cookies";
import { apiEndpoint } from "../config";
import Page from "../components/Page";
import UserContext from "../components/UserContext";

axios.defaults.baseURL = apiEndpoint;
axios.defaults.withCredentials = true;
axios.defaults['xsrfCookieName'] = "csrf_access_token"
axios.defaults['xsrfHeaderName'] = "X-CSRF-TOKEN"
axios.defaults.headers.post["Content-Type"] = "application/json";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx.req) {
      axios.defaults.headers.Cookie = ctx.req.headers.cookie || "";
    }
    else {
      axios.defaults.headers.Cookie = document.cookie
    }

    let user = await axios
      .get("/user", {
        withCredentials: true
      })
      .then(res => res.data)
      .catch(err => err.response.data);
    console.group("First User Try");
    console.log(user);
    console.groupEnd();
    if (user.msg) {
      if (user.msg === 'Missing cookie "access_token_cookie"') {
        user = null;
      } else {
        if (user.msg === "Token has expired") {
          let {
            access_token_cookie,
            refresh_token_cookie,
            csrf_access_token,
            csrf_refresh_token
          } = await nookies.get(ctx);
          console.log(csrf_refresh_token)
          const refresh = await axios
            .post(
              "/refresh",
              {},
              {
                withCredentials: true,
                headers: {
                  "X-CSRF-TOKEN": csrf_refresh_token
                }
              }
            )
            .then(res => res.headers["set-cookie"])
            .catch(err => err.response.data);
            console.log(refresh)

          access_token_cookie = await refresh[0].substring(
            refresh[0].indexOf("=") + 1,
            refresh[0].indexOf(";")
          );

          csrf_access_token = await refresh[1].substring(
            refresh[1].indexOf("=") + 1,
            refresh[1].indexOf(";")
          );

          await nookies.set(ctx, "access_token_cookie", access_token_cookie, {
            httpOnly: true,
            path: "/"
          });
          await nookies.set(ctx, "csrf_access_token", csrf_access_token, {
            path: "/"
          });
        }

        user = await axios
          .get("/user", {
            withCredentials: true
          })
          .then(res => res.data)
          .catch(err => null);
      }
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
            <Component {...pageProps} user={user}/>
          </Page>
        </UserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
