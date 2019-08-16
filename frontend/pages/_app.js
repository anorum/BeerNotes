import App, { Container } from "next/app";
import Cookies from 'js-cookie'
import nookies from 'nookies'
import axios from 'axios'
import cookies from 'next-cookies'
import {apiEndpoint} from '../config'
import Page from "../components/Page";
import UserContext from "../components/UserContext"

axios.defaults.baseURL = apiEndpoint
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('csrf_access_token')
axios.defaults.headers.post['Content-Type'] = 'application/json'

console.log(Cookies.get('csrf_access_token'))

class MyApp extends App {

  static async getInitialProps({ Component, ctx}) {
      let pageProps = {};
      
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
        let { access_token_cookie, refresh_token_cookie, csrf_access_token, csrf_refresh_token } =  await nookies.get(ctx);
      
        if (ctx.req) {
          axios.defaults.headers.Cookie = ctx.req.headers.cookie || "";
        }
        else {
          axios.defaults.headers.Cookie = document.cookie
        }

      let user = await axios.get('/user', {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrf_access_token || null,
        }
      })
        .then(res => (res.data))
        .catch(err =>(err.response.data))
        console.group("First User Try")
        console.log(user)
        console.groupEnd()
          if (user.msg) {
            if (user.msg === 'Missing cookie "access_token_cookie"') {
              user = null;
              
            }
            else {
              if (user.msg === "Token has expired") {
                const refresh = await axios
                .post('/refresh',{} ,{
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": csrf_refresh_token, 
                  }
                })
                .then(res => (res.headers["set-cookie"][0]))
                .catch(err => (err.response.data))
                axios.defaults.headers.Cookie = refresh
                console.group("Refresh Try")
                console.log(refresh)
                access_token_cookie = refresh.substring(
                  refresh.indexOf("=") + 1,
                  refresh.indexOf(";")
                )

                nookies.set(ctx, "access_token_cookie", access_token_cookie, {
                  httpOnly: true,
                  path: "/"
                })
                

              }

              user = await axios
                .get('/user', {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": csrf_access_token,
                  }
                })
                .then(res => (res.data))
                .catch(err => (null))

          }
        }
      
          
      
      pageProps.query = ctx.query;
      
      return { pageProps, user };
    }

  render() {
    const { Component, pageProps, user } = this.props;
    return (
      <Container>
      <UserContext.Provider value={{user}}>
        <Page>
          <Component {...pageProps} />
        </Page>
        </UserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
