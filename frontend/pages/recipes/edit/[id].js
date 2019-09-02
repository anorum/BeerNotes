import User from "../../../components/User";
import withAuthSync from "../../../components/withAuthSync";
import CreateRecipe from "../../../components/CreateRecipe";
import axios from "axios";

const EditRecipe = props => {
  return <CreateRecipe recipe={props.recipe} edit={true} user={props.user} />;
};

EditRecipe.getInitialProps = async ({ req, query: { id } }) => {
  const recipe = await axios
    .get(`/recipe/${id}`)
    .then(res => res.data)
    .catch(err => err.message);

  return { recipe };
};

export default withAuthSync(EditRecipe);
