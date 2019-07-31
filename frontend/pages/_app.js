import App, { Container } from "next/app";
import Cookies from 'js-cookie'
import axios from 'axios'
import {apiEndpoint} from '../config'
import Page from "../components/Page";
import UserContext from "../components/UserContext"

axios.defaults.baseURL = apiEndpoint
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('csrf_access_token')
axios.defaults.headers.post['Content-Type'] = 'application/json'



class MyApp extends App {
state = {
        user: null,
        loading: true,
        error: false
    }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    
    return { pageProps };
  }


  componentDidMount() {
    this.checkLogin()
}


requestUser = async () => {
  const user = await axios
      .get('/user')
      .then(res => (res.data))
      .catch(err => (err.response.data || null)
      )
  return user
}

refreshLogin = async () => {
  const refresh = await axios
      .post('/refresh', {} , {headers: {'X-CSRF-TOKEN': Cookies.get('csrf_refresh_token')}})
      .then(res => res.data)
      .catch(err => err.response.data)
      return refresh
}   

checkLogin = async () => {
  let user = null
  if (Cookies.get('csrf_access_token') || Cookies.get('csrf_refresh_token')) {
      user = await this.requestUser()
      if (user.msg) {
          if (user.msg === "Token has expired") {
              await this.refreshLogin()
          }
      }
    }

  
  this.setState({
      user,
      loading: false
  })
}



  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
      <UserContext.Provider value={this.state}>
        <Page>
        {this.state.loading ? <div> Loading..</div> :
          <Component {...pageProps} />
        }
          
        </Page>
        </UserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
