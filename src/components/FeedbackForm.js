import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import { useEffect } from 'react';
import RatingSelect from './RatingSelect';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);
  const [rating, setRating] = useState(10);

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  //   Validation of input
  useEffect(() => {
    if (text === '') {
      setBtnDisabled(true);
      setValidationMessage(null);
    } else if (text !== '' && text.trim().length < 10) {
      setValidationMessage('Review should be at least 10 characters long');
      setBtnDisabled(true);
    } else {
      setValidationMessage(null);
      setBtnDisabled(false);
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length >= 10) {
      const feedback = {
        text: text,
        rating: rating,
      };
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, feedback);
      } else {
        addFeedback(feedback);
      }
    }
    setText('');
  };

  return (
    <Card reverse={false}>
      <form onSubmit={handleSubmit}>
        <h2>Please write your review</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type={text}
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {validationMessage && (
          <div className="message">{validationMessage}</div>
        )}
      </form>
    </Card>
  );
}

export default FeedbackForm;
