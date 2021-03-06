import User from "../../components/User";
import NotUser from "../../components/NotUser";
import StyledButton from "../../components/styles/StyledButton";
import RecipeSearch from "../../components/RecipeSearch";
import { HeaderSection } from "../../components/styles/PageStyles";

const RecipesHome = props => {
  return (
    <div>
      <HeaderSection>
        <h1>Find Recipes</h1>
        <User>
          <StyledButton href="/recipes/create">Create</StyledButton>
        </User>
        <NotUser>
          <div style={{ alignSelf: "center" }}>
            Sign up for a free account to create recipes!
            <StyledButton href="/signup">Sign Up</StyledButton>
          </div>
        </NotUser>
      </HeaderSection>
      <RecipeSearch />
    </div>
  );
};

export default RecipesHome;
