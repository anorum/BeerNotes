import App, { Container } from "next/app";
import Cookies from 'js-cookie'
import axios from 'axios'
import {apiEndpoint} from '../config'
import Page from "../components/Page";

axios.defaults.baseURL = apiEndpoint
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('csrf_access_token')
axios.defaults.headers.post['Content-Type'] = 'application/json'


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
