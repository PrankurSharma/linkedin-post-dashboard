import { useMemo } from "react";
import PostCard from "./PostCard";

export default function Posts({ data, searchTerm, activeFilters }) {
    const mostEngaging = useMemo(() => {
        if (searchTerm === "" && activeFilters.length === 0) {
            const top3 = data?.items?.sort((a, b) => b.socialActivityCountsInsight?.totalReactionCount - a.socialActivityCountsInsight?.totalReactionCount).slice(0, 3) || [];
            return top3;
        }
        else {
            return [];
        }
    }, [data, searchTerm, activeFilters]);

    if (data.items && data.items.length === 0) {
        return <span>No Data Found</span>;
    }
    else {
    return (
        <div>
            {(searchTerm === "" && activeFilters.length === 0) && <>
                <h2 className="heading">Most Engaging Posts</h2>
                <div className="outer-grid">
                    {mostEngaging.map((post) => (<PostCard key={post.urn} data={post} />))}
                </div>
            </>}
            <h2 className="heading">Posts</h2>
            <div className="outer-grid">
                {data?.items?.map((post) => (<PostCard key={post.urn} data={post} />))}
            </div>
        </div>
    );
}
}