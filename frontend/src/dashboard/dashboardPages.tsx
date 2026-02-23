import Header from "../components/common/header"

export default function DashboardPages() {
    return(
        <>
        <Header isLogin={true} />
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the dashboard! Here you can find various metrics and insights.</p>
        </div>
        </>
    )
}