import PropTypes from 'prop-types';
import Card from './shared/Card';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({ item: { id, rating, text }, handleDelete }) {
  const { editFeedback } = useContext(FeedbackContext);

  return (
    <Card reverse={false}>
      <button onClick={() => handleDelete(id)} className="close">
        <FaTimes size={'20'} color="purple" />
      </button>
      <button
        onClick={() => editFeedback({ id, rating, text })}
        className="edit"
      >
        <FaEdit size={'20'} color="purple" />
      </button>
      <div className="num-display">{rating}</div>
      <div className="text-display">
        <h2>{text}</h2>
      </div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
