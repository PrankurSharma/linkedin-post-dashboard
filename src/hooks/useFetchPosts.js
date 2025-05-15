import { useEffect, useRef, useState } from "react";

export default function useFetchPosts (searchTerm) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const controllerRef = useRef(null);


    useEffect(() => {
        let timeout;
        if (controllerRef.current) {
            controllerRef.current.abort();
          }
        const controller = new AbortController();
        controllerRef.current = controller;

        const callApi = () => {
            const apiStr = import.meta.env.VITE_RAPID_API_ENDPOINT + "/search-posts";
            if (searchTerm === "") {
                setLoading(true);
            }
            fetch(apiStr, {
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                    "Content-type": "application/json"
                },
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify({
                    keyword: searchTerm             
                })
            }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data);
                    setError("");
                }
                else {
                    setError(data.message);
                }
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }})
            .finally(() => setLoading(false));
        }

        if (searchTerm) {
            timeout = setTimeout(() => callApi(), 200);
        }
        else {
            callApi();            
        }
        return (() => clearTimeout(timeout));
    }, [searchTerm]);

    return { loading, data, error };
}