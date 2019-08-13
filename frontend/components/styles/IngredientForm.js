import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-gap: 5px 5px;
  grid-template-columns: min-content auto 0.05fr;
  grid-template-rows: 1fr auto;
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`;

export const DeleteButtonContainer = styled.div`
  align-self: center;
`;