import Ingredient from "../../components/Ingredient";
import Recipes from "../../components/Recipes";
import axios from "axios";

const Yeast = props => {
  const { yeast, your_recipes, all_recipes } = props.yeasts_data;
  return (
    <div style={{ marginTop: "15px", marginBottom: "35px" }}>
      <Ingredient for="yeasts" ingredient={yeast} />
      {your_recipes && your_recipes.length > 0 && (
        <div>
          <h1>Your Recipes Using This Yeast</h1>
          <Recipes recipes={your_recipes} />
        </div>
      )}
      <h1> All Recipes Using This Yeast</h1>
      {all_recipes.length > 0 ? (
        <Recipes recipes={all_recipes} />
      ) : (
        <div>
          No public recipes are using this yeast. Perhaps you should create one!
        </div>
      )}
    </div>
  );
};

Yeast.getInitialProps = async ({ req, query: { id } }) => {
  if (req) {
    let yeasts_data = await axios
      .get(`/yeast/${id}`, {
        headers: {
          withCredentials: true,
          cookie: req.headers.cookie || ""
        }
      })
      .then(res => res.data)
      .catch(err => err.message);
    return { yeasts_data };
  } else {
    let yeasts_data = await axios
      .get(`/yeast/${id}`)
      .then(res => res.data)
      .catch(err => err.message);
    return { yeasts_data };
  }
};

export default Yeast;
