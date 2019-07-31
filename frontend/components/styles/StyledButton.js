import styled from 'styled-components'
import Link from 'next/link'

const LinkStyle = styled.a`
cursor: pointer;
border-radius: 4px;
min-width: 85px;
text-align: center;
height: 40px;
background: #3ecf8e;
text-shadow: 0 1px 3px rgba(36,180,126,.4);
box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
padding: 0 14px;
display: inline-block;
line-height: 40px;
text-transform: uppercase;
color: #fff;
transition: all .15s ease;
font-size: 1.5rem;
margin: auto 23px;

    :hover {
        box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
        transform: translateY(-1px);
    }

`

const StyledButton = (props) => (
<Link href={props.href}>
    <LinkStyle style={{background: props.background, 
                        color: props.color, 
                        background: props.clear && 'rgba(0,0,0,0)',
                        border: props.clear && `1px solid ${props.color || '#fff'}`}}>
        {props.children}
    </LinkStyle>
</Link>)

export default StyledButton