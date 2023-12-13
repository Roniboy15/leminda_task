import React, { useState } from 'react'

const Feedback = ({setShowFeedbackModal, questions, currentQuestionIndex}) => {

    const [feedback, setFeedback] = useState({});
    const [rating, setRating] = useState(1);

    const handleFeedbackChange = (e) => {
        setFeedback({ ...feedback, [questions[currentQuestionIndex].id]: e.target.value });
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleFeedbackSubmit = () => {
        console.log('Feedback:', feedback[questions[currentQuestionIndex].id], 'Rating:', rating);
        setShowFeedbackModal(false);
    };
    return (

        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Feedback</h5>
                        <button type="button" className="btn-close" onClick={() => setShowFeedbackModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Your feedback"
                            onChange={handleFeedbackChange}
                        />
                        <input
                            type="number"
                            className="form-control mt-2"
                            min="1"
                            max="5"
                            placeholder="Rating (1-5)"
                            onChange={handleRatingChange}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowFeedbackModal(false)}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleFeedbackSubmit}>
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback
