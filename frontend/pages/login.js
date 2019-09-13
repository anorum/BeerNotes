import SignIn from "../components/SignIn"
import withoutAuthSync from "../components/withoutAuthSync"

const Login = props => {
    return (
        <div> 
        <SignIn />
        </div>
    )
}

export default withoutAuthSync(Login)