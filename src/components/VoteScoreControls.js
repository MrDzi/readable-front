import React from 'react';

function VoteScoreControls(props) {
    return (
        <div>
            <span onClick={() => props.handleVoteScoreChange('upVote')}>Upvote</span>
            <span onClick={() => props.handleVoteScoreChange('downVote')}>Downvote</span>
        </div>
    )
}

export default VoteScoreControls;
