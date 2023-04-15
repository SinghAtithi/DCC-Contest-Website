import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";

const contestPage = () => {
    const router = useRouter();
    const { cid } = router.query;

    return (
        <div>
            <Head><title>Contest - {cid}</title></Head>
            <Navbar />

            <div className="main-nav-content-area">
                Contest Page - {cid}
                {/* Content goes here */}
            </div>

        </div>
    );
};

export default contestPage;
