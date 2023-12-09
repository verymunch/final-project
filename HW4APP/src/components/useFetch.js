import {useEffect, useState} from "react";

const useFetch = (URL) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();
        fetch(URL, {signal: abortCtrl.signal}).then(resp => {
            if (!resp.ok) {
                throw Error("Cannot fetch URL for data resource.");
            }
            return resp.json()
        }).then(data => {
            setStatus(false);
            setData(data);
            setError(null);
        }).catch((err) => {
            if (err.name == 'AbortError') {
                console.log("Fetch Aborted ->");
                console.log(err.message);
            } else {
                console.log("Error:");
                console.log(err.message);
                setStatus(false);
                setError(err.message);
            }
        })
        return () => {
            abortCtrl.abort();
        }
    }, [URL]);
    return {data, status, error}
}

export default useFetch;