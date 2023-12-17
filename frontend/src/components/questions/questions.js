import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiPost } from '../../services/apiServices';
import Feedback from './feedback';
import './questions.css'
import LoadingSpinner from '../../hooks/loading/loading';
import formatTime from '../../utils/timerFormat';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionsFetched = await doApiGet(API_URL + '/questions/all');
                setQuestions(questionsFetched);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching questions:', err);
                navigate("/");
            }
        };
        fetchQuestions();
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    const handleAnswerChange = (e) => {
        setAnswers({ ...answers, [questions[currentQuestionIndex].id]: e.target.value });
    };

    const navigateQuestions = (direction) => {
        const newIndex = currentQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < questions.length) {
            setCurrentQuestionIndex(newIndex);
        }
    };

    const handleSubmitAnswers = async () => {
        try {
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            await doApiPost(API_URL + "/responses", { answers, userId: JSON.parse(localStorage.getItem('user')).id, elapsedTime: timeElapsed });
            navigate("/");
            alert("Thanks for answering our questions!");
        } catch (err) {
            console.error('Error submitting answers:', err);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            {loading ? <LoadingSpinner /> :
                <div className="container mt-4">
                    {questions.length > 0 && (
                        <div className='row justify-content-center'>
                            <div className="card mb-3 col-11 col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Question {currentQuestionIndex + 1}</h5>
                                    <p className="card-text mt-3">{currentQuestion.text}</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your answer"
                                        value={answers[currentQuestion.id] || ''}
                                        onChange={handleAnswerChange}
                                    />
                                    <button className="btn btn-primary mt-3" onClick={() => navigateQuestions(-1)} disabled={currentQuestionIndex === 0}>
                                        Previous Question
                                    </button>
                                    {currentQuestionIndex === questions.length - 1 ? (
                                        <button className="btn btn-success mt-3 ms-2" onClick={handleSubmitAnswers}>
                                            Send Answers
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary mt-3 ms-2 me-2" onClick={() => navigateQuestions(1)}>
                                            Next Question
                                        </button>
                                    )}
                                    <button className="btn btn-secondary mt-3" onClick={() => setShowFeedbackModal(true)}>
                                        Give Feedback
                                    </button>
                                </div>
                            </div>
                            <div className="timer-container fixed-bottom mb-3">
                                <div className="timer">
                                    {formatTime(elapsedTime)}
                                </div>
                            </div>
                        </div>
                    )}
                    {showFeedbackModal && <Feedback setShowFeedbackModal={setShowFeedbackModal} questions={questions} currentQuestionIndex={currentQuestionIndex} />}
                </div>
            }
        </>
    );
};

export default Questions;
