import { useRouter } from 'next/router';
import Navbar from "../../components/Navbar";

const contestPage = () => {
    const router = useRouter();
    const { cid } = router.query;


    return (

        <div>
            <Navbar />
            Contest Page - {cid}
        </div>
    )
}

export default contestPage;