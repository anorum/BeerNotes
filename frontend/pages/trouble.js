import Forgot from "../components/Forgot";
import styled from "styled-components";
import ResendConfirm from "../components/ResendConfirm";
import withoutAuthSync from "../components/withoutAuthSync"

const TroubleContainer = styled.div`
  display: flex;
  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column;
  }
`;

const forgot = props => {
  return (
    <TroubleContainer>
      <Forgot />
      <ResendConfirm />
    </TroubleContainer>
  );
};

export default withoutAuthSync(forgot);
