import User from "../../components/User"
import CreateRecipe from "../../components/CreateRecipe"
import withAuthSync from "../../components/withAuthSync"

const AddRecipe = props => {

    return (
    <User>
        <CreateRecipe />
    </User>
    )
}

export default withAuthSync(AddRecipe)