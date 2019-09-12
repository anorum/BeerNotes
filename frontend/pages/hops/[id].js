import Ingredient from "../../components/Ingredient";
import Recipes from "../../components/Recipes";
import axios from "axios";

const Hop = props => {
  const { hop, your_recipes, all_recipes } = props.hops_data;
  return (
    <div style={{ marginTop: "15px", marginBottom: "35px" }}>
      <Ingredient for="hops" ingredient={hop} />
      {your_recipes && your_recipes.length > 0 && (
        <div>
          <h1>Your Recipes Using This Hop</h1>
          <Recipes recipes={your_recipes} />
        </div>
      )}
      <h1> Recipes Using This Hop</h1>
      {all_recipes.length > 0 ? (
        <Recipes recipes={all_recipes} />
      ) : (
        <div>
          {" "}
          No public recipes are using this hop. Perhaps you should create one!
        </div>
      )}
    </div>
  );
};

Hop.getInitialProps = async ({ req, query: { id } }) => {
  if (req) {
    let hops_data = await axios
      .get(`/hop/${id}`, {
        headers: {
          withCredentials: true,
          cookie: req.headers.cookie || ""
        }
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err.message);
      });
    return { hops_data };
  } else {
    let hops_data = await axios
      .get(`/hop/${id}`)
      .then(res => res.data)
      .catch(err => err.message);
    return { hops_data };
  }
};

export default Hop;
