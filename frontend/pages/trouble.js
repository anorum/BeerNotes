import Forgot from "../components/Forgot"
import ResendConfirm from "../components/ResendConfirm"

const forgot = props => {
    return (
        <div style={{display: "flex"}}> 
        <Forgot />
        <ResendConfirm />
        </div>
    )
}

export default forgot