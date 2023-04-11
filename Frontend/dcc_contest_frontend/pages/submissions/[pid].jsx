import React from "react";
import { useRouter } from "next/router";

export default function particularSubmission() {
    const router = useRouter();
    const { pid } = router.query;
    return <div>Particular Submission Page of submission id {pid}</div>;
}
