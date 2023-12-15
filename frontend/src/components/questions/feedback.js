import React, { useState } from 'react'
import { API_URL, doApiPost } from '../../services/apiServices';

const Feedback = ({ setShowFeedbackModal, questions, currentQuestionIndex }) => {

    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(1);


    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value)
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleFeedbackSubmit = async () => {

        const userId = JSON.parse(localStorage.getItem('user')).id;
        const questionId = questions[currentQuestionIndex].id;

        try {
            const body = {userId: userId, questionId: questionId, text: feedback, rating: rating };

            await doApiPost(API_URL + "/feedbacks", body)
            alert("Feedback sent!")
            setShowFeedbackModal(false)
        } catch (err) {
            console.error('Error submitting feedback:', err);
        }
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
