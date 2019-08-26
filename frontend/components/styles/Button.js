import styled from "styled-components"

const Button = styled.button`
cursor: pointer;
border-radius: 4px;
min-width: 85px;
text-align: center;
height: 50px;
background: ${props => props.background};
text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
display: inline-block;
line-height: 40px;
text-transform: uppercase;
color: ${props => props.color};
transition: all 0.15s ease;
font-size: 1.8rem;
width: 100%;

:hover {
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}
:focus {
  outline: 0;
}
`

export default Button