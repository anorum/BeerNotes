import User from "../../../components/User"
import CreateRecipe from "../../../components/CreateRecipe"
import axios from "axios";

const EditRecipe = props => {

    return (
    <User>
        <CreateRecipe recipe={props.recipe} edit={true}/>
    </User>
    )
}

EditRecipe.getInitialProps = async ({ req, query: { id } }) => {
    const recipe = await axios
    .get(`/recipe/${id}`)
    .then(res => res.data)
    .catch(err => err.message);

    return { recipe }
}

export default EditRecipe