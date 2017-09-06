import React from 'react';
import VoteScoreControls from './VoteScoreControls';

export default function CommentsList({ comments, handleDeleteComment, handleCommentVoteScoreChange }) {
    return (
        <ul>
            {comments.map(comment => (
                <li key={comment.id}>
                    {comment.body} <span>{comment.voteScore}</span>
                    <span onClick={() => handleDeleteComment(comment.id)}>Delete</span>
                    <VoteScoreControls handleVoteScoreChange={(option) => handleCommentVoteScoreChange(option, comment.id)} />
                </li>
            ))}
        </ul>
    )
}
