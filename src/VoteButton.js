import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function VoteButton({ id }) {
  const dispatch = useDispatch();
  const votes = useSelector(state => state.votes);

  const handleVote = () => {
    dispatch({ type: 'VOTE', payload: { id } });
  };

  return (
    <button onClick={handleVote}>Vote ({votes[id] || 0})</button>
  );
}

export default VoteButton;
