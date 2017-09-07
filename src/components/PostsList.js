import React from 'react';
import { Link } from 'react-router-dom';

export default function PostsList({ posts, editPost }) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title} {post.voteScore} {post.timestamp} comments: {post.commentsCount}</Link>
                    <span onClick={() => editPost(post)}>Edit</span>
                </li>
            ))}
        </ul>
    )
}
