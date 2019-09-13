import SignUp from "../components/SignUp"
import withoutAuthSync from "../components/withoutAuthSync"


const signup = props => {
    return (
        <div> 
        <SignUp />
        </div>
    )
}

export default withoutAuthSync(signup)