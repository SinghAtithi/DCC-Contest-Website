import { useRouter } from "next/router";
import { useEffect } from "react";
// useEffect

export default function test() {
    const { asPath } = useRouter();

    useEffect(() => {
        console.log(asPath);
    }, []);

    return <>Hello,,,</>;
}
