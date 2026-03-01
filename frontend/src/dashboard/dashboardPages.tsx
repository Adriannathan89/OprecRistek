import Header from "../components/common/header"
import FormsArea from "../forms/formsArea"

export default function DashboardPages() {
    return(
        <>
        <Header isLogin={true} />
        <FormsArea />
        </>
    )
}