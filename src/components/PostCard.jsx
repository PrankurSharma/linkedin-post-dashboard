import { useState } from "react";

export default function PostCard({ data }) {
    const [openPost, setOpenPost] = useState(false);
    const authorInfo = data?.author || {};
    const totalReactions = parseInt(data?.socialActivityCountsInsight?.totalReactionCount);

    const repostInfo = data?.resharedPost || {};
    const postedDate = data?.postedData ? new Date(data?.postedDate).toLocaleString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }) : "";

    const toggleRepost = () => {
        setOpenPost(openPost => !openPost);
    }
    
    return (
        <div className="post-card">
            <div className="card-head">
                {authorInfo.profilePictures ? <img className="profile-picture" src={authorInfo?.profilePictures[0].url} /> : null}
                <div className="profile-info">
                    <h2 className="profile-name" title={authorInfo.fullName}>{authorInfo.fullName}</h2>
                    <p className="profile-headline" title={authorInfo.headline}>{authorInfo.headline}</p>
                    <p className="post-time">{postedDate}</p>
                </div>
            </div>
            <div className="card-body">
                <p className="body-txt">{data?.text}</p>
                {data?.reposted && <button className="repost-btn" onClick={toggleRepost}>{openPost ? "Close" : "Open"} Re-posted Post</button>}
                {openPost && <div className="repost">
                        <h2 className="profile-name">{(repostInfo?.author?.firstName + " " + repostInfo?.author?.lastName)}</h2>
                        <p className="body-txt">{repostInfo?.text}</p>
                    </div>}
            </div>
            <div className="card-footer">
                <div>
                    <span className="reaction">👍</span>
                    <span>{((totalReactions ? totalReactions : "") + (totalReactions === 1 ? " person" : totalReactions === 0 ? "No-one" : " people"))} reacted to this post</span>
                </div>
                <a className="linkedin-class" href={data?.url} target="_blank">LINKEDIN</a>
            </div>
        </div>
    );
}