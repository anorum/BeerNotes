import User from "../../components/User"
import NotUser from "../../components/NotUser"
import StyledButton from "../../components/styles/StyledButton"
import PublicRecipes from "../../components/PublicRecipes";

const RecipesHome = props => {
    return (
        <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1>Find Recipes</h1>
        <User>
            <StyledButton href="/recipes/create">Create</StyledButton>
        </User>
        <NotUser>
        <div style={{alignSelf: "center"}}>
            Sign up for a free account to create recipes!
            <StyledButton href="/register">Sign Up</StyledButton>
        </div>
        </NotUser>
        </div>
        <PublicRecipes />

        </div>
    )
}

export default RecipesHome