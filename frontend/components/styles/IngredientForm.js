import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  margin: 0.5rem 23px;
  grid-template-columns: min-content auto 0.05fr;
  grid-template-rows: 1fr auto;
  border: 0.5px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
`;

export const ViewContainer = styled.div`
  display: grid;
  margin: 0.5rem 23px;
  grid-template-columns: min-content auto 0.05fr;
  grid-template-rows: 1fr auto;
  padding: 15px 0;
`

export const IngredientHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IngredientsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
`;

export const IngredientLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const IngredientListContainer = styled.div`
display: grid;
grid: auto / 1fr 1fr;

@media only screen and (max-width: ${props => props.theme.ultrawide}) {
    grid: 1fr / 1fr;
  }

`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  @media only screen and (max-width: ${props => props.theme.desktop}) {
    flex-direction: column;
  }

`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 0 2rem;
`;

export const DeleteButtonContainer = styled.div`
  align-self: center;
  margin-right: 20px;
  justify-self: flex-end;
`;

export const IngredientContainer = styled.div`
  padding: 1rem 3rem;
  transition: box-shadow 0.25s;
  border: 0.5px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  width: 100%;

`;

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.2fr 1fr;
  @media only screen and (max-width: ${props => props.theme.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 0.8fr;
  }
`;

export const CreateWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 0.8fr;
`;

export const Format = styled.span`
  border-radius: 50px;
  padding: 0.2rem 3rem;
  color: white;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem 2rem;
  font-weight: 400;
`;

export const DetailHeader = styled.div`
  font-size: 1.6rem;
  color: #707070;
  font-weight: 700;
`;

export const NameContainer = styled.div`
  margin-right: 40px;
  font-size: 1.7rem;
  color: ${props => props.theme.black};
  @media only screen and (max-width: ${props => props.theme.tablet}) {
    margin-right: 0px;
    width: 100%;
    border-bottom: 1px solid #d4d4d4;
  }
`;
