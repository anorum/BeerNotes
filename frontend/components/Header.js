import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import Nav from './Nav'

Router.onRouteChangeStart = () =>  {
    NProgress.start();
}
Router.onRouteChangeComplete = () => {
    NProgress.done();
} 
Router.onRouteChangeError = () =>  {
    NProgress.done();
}

const Logo = styled.h1`
font-size: 4rem;
margin-left: 2rem;
position: relative;
z-index: 2;
a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`

const Header = () => (
    <Logo>
        <Link href="/"><a>Beer Notes</a></Link>
    </Logo>
)

export default Header;