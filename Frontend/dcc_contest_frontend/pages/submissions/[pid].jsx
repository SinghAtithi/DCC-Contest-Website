import React from "react";
import { useRouter } from "next/router";

export default function ParticularSubmission() {
    const router = useRouter();
    const { pid } = router.query;
    return <div>Particular Submission Page of submission id {pid}</div>;
}
