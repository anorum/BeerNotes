import styled from 'styled-components'

const FilterButton = styled.h3`
text-transform: uppercase;
margin: .25rem 0;
color: ${props => props.theme.black};

 &:after {
     transform: scaleX(1);
     display: block;
     height: 3px;
     margin-top: 6px;
     background:  ${props => props.theme.mainColor};
    transition: all .4s ease;
    transform: scaleX(0);
    transform-origin: left center;
 }
`

export default FilterButton