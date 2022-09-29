import { useState } from "react";
import { useLocation } from "react-router-dom"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SingleXapi(aaaa) {

    let query = useQuery();

    let [link, setLink] = useState(atob(query.get('link')));

    return <>

        <iframe src={link}
            width="100%"
            height="700rem"
        ></iframe>
    </>
}

