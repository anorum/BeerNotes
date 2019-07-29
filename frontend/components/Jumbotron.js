import styled from "styled-components";

const Jumbotron = styled.div`
  margin-bottom: 2rem;
  background: ${props => props.theme.mainColor};
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;

  /*Commenting out to test letting the user do their own style inside
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
`;

export default Jumbotron;
