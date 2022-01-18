import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      `https://61e69a18ce3a2d00173592bc.mockapi.io/feedback`
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);

    return data;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));

      const response = await fetch(
        `https://61e69a18ce3a2d00173592bc.mockapi.io/feedback/${id}`,
        {
          method: 'DELETE',
        }
      );
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch(
      `https://61e69a18ce3a2d00173592bc.mockapi.io/feedback`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      }
    );
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(
      `https://61e69a18ce3a2d00173592bc.mockapi.io/feedback/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem),
      }
    );

    const data = await response.json();

    setFeedback(
      feedback.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            text: data.text,
            rating: data.rating,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        handleDelete,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
