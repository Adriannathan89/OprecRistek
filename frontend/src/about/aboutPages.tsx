import Header from "../components/common/header";

export default function AboutPages() {
    return(
        <>
            <Header isLogin={false} />
            <div className="ml-6">
                <h1 className="text-2xl font-bold mb-4">About Us</h1>
                <p>Welcome to our application! We are dedicated to providing the best experience for our users. Our team is passionate about creating innovative solutions that make your life easier. Thank you for visiting our about page!</p>
            </div>
        </>

    )
}