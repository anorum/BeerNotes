import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-gap: 15px 5px;
  margin: .5rem 23px;
  grid-template-columns: min-content auto 0.05fr;
  grid-template-rows: 1fr auto;
  
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 0 2rem;
`;

export const DeleteButtonContainer = styled.div`
  align-self: center;
`;