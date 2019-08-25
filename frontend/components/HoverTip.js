import styled from "styled-components"

const Help = styled.span`
  white-space: nowrap;
  cursor: help;
  position: relative;

  &::before,
  &::after {
    left: 50%;
    opacity: 0;
    position: absolute;
    z-index: -100;
  }

  &:hover::before,
  &:focus::before,
  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: scale(1) translateY(0);
    z-index: 100;
    text-align: left;
    white-space: normal;
    outline: none;
  }

  /*== pointer tip ==*/
  &::before {
    border-style: solid;
    border-width: 1rem 0.75rem 0 0.75rem;
    border-color: ${props => props.theme.statColor} transparent transparent transparent;
    bottom: 100%;
    left: 15%;
    content: "";
    margin-left: -0.5em;
  }

  /*== speech bubble ==*/
  &::after {
    background: ${props => props.theme.statColor};
    border-radius: 0.25em;
    font-weight: 400;
    bottom: 120%;
    color: ${props => props.theme.black};
    content: attr(data-tip);
    margin-left: -8.75em;
    padding: 1em;
    width: 17.5em;
    position: absolute;
  }
`;

const HoverTip = props => <Help data-tip={props.help}>{props.children}</Help>;

export default HoverTip;
