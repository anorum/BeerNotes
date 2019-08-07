import styled from 'styled-components'

const FilterButton = styled.h3`
text-transform: uppercase;
margin: .25rem 0;
color: ${props => props.theme.black};
cursor: pointer;

position: relative;
    margin: 1rem 3rem;

    &::after {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 4px;
      background: ${props => props.theme.mainColor};
      content: "";
      opacity: 0;
      -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
      -moz-transition: opacity 0.3s, -moz-transform 0.3s;
      transition: opacity 0.3s, transform 0.3s;
      -webkit-transform: translateY(10px);
      -moz-transform: translateY(10px);
      transform: translateY(10px);
    }

    &:hover::after,
    &:focus::after {
      opacity: 1;
      -webkit-transform: translateY(0px);
      -moz-transform: translateY(0px);
      transform: translateY(0px);
    }
  
    &[aria-active='true'] {
        &::after {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 4px;
      background: ${props => props.theme.mainColor};
      content: "";
      -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
      -moz-transition: opacity 0.3s, -moz-transform 0.3s;
      transition: opacity 0.3s, transform 0.3s;
      opacity: 1;
      -webkit-transform: translateY(5px);
      -moz-transform: translateY(5px);
      transform: translateY(5px);
    }
    }

`

export default FilterButton