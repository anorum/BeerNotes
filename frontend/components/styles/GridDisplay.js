import styled from "styled-components"

const GridDisplay = styled.div`
display: grid;
padding: 10px;
grid-template-columns: 1fr 1fr;
gap: 20px 20px;
margin: 0 auto;

@media screen and (max-width: ${props => props.theme.desktop}) {
    grid-template-columns: 1fr;
    padding: 0px;
}
`

export default GridDisplay