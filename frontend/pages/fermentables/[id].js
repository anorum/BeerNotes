import Ingredient from "../../components/Ingredient";
import Recipes from "../../components/Recipes";
import axios from "axios";

const Fermentable = props => {
  const { fermentable, your_recipes, all_recipes } = props.fermentables_data;
  return (
    <div style={{ marginTop: "15px" }}>
      <Ingredient for="fermentables" ingredient={fermentable} />
      {your_recipes && your_recipes.length > 0 && (
        <div>
          <h1>Your Recipes Using This Fermentable</h1>
          <Recipes recipes={your_recipes} />
        </div>
      )}
      <h1> All Recipes Using This Fermentable</h1>
      {all_recipes.length > 0 ? (
        <Recipes recipes={all_recipes} />
      ) : (
        <div>
          No recipes are using this fermentable. Perhaps you should create one!
        </div>
      )}
    </div>
  );
};

Fermentable.getInitialProps = async ({ req, query: { id } }) => {
  if (req) {
    let fermentables_data = await axios
      .get(`/fermentable/${id}`, {
        headers: {
          withCredentials: true,
          cookie: req.headers.cookie || ""
        }
      })
      .then(res => res.data)
      .catch(err => err.message);
    return { fermentables_data };
  } else {
    let fermentables_data = await axios
      .get(`/fermentable/${id}`)
      .then(res => res.data)
      .catch(err => err.message);
    return { fermentables_data };
  }
};

export default Fermentable;
