import { useMemo, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import Filters from "./Filters";
import Posts from "./Posts";

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data, loading, error } = useFetchPosts(searchTerm);
    const [activeFilters, setActiveFilters] = useState([]);
    const filteredData = useMemo(() => {
        const myData = activeFilters.length > 0 ? data?.items ? data?.items?.filter((item) => {
                const checks = [];
                if (activeFilters.includes('original')) checks.push(!item.reposted);
                if (activeFilters.includes('reshared')) checks.push(item.reposted);
                if (activeFilters.includes('video')) checks.push(item.video?.video ? true : false);

                return checks.every(Boolean);
            }) : [] : data?.items ? [...data.items] : [];
        const final = {
            ...data,
            items: [...myData]
        }
        return final;
    }, [data, searchTerm, activeFilters]);


    const handleSearch = (term) => {
        console.log('Search:', term);
        setSearchTerm(term);
    };

    const handleFilterChange = (filter) => {
        setActiveFilters(filter);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
        {error && <div className="err-class">{error}</div>}
        <div>
            <Filters onSearch={handleSearch} onFilterChange={handleFilterChange} />
            <Posts data={filteredData} searchTerm={searchTerm} activeFilters={activeFilters}/>
        </div>
        </>
    );
}
