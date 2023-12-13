import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiServices';
import Feedback from './feedback';
import './questions.css'
import LoadingSpinner from '../../hooks/loading/loading';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const questions = await doApiGet(API_URL + '/questions/all');
            setQuestions(questions);
            setLoading(false);
        } catch (error) {
            navigate("/");
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        setCurrentAnswer(answers[questions[currentQuestionIndex]?.id] || '');
    }, [currentQuestionIndex, answers, questions]);

    const handleAnswerChange = (e) => {
        setCurrentAnswer(e.target.value);
        setAnswers({ ...answers, [questions[currentQuestionIndex].id]: e.target.value });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };



    const handleSubmitAnswers = () => {
        console.log('Answers:', answers);
    };

    return (
        <>
            {!loading ?
                <div className="container mt-4">
                    {questions.length > 0 && (
                        <div className='row justify-content-center'>
                            <div className="card mb-3 col-11 col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Question {currentQuestionIndex + 1}</h5>
                                    <p className="card-text mt-3">{questions[currentQuestionIndex].text}</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your answer"
                                        value={currentAnswer}
                                        onChange={handleAnswerChange}
                                    />
                                    {currentQuestionIndex > 0 && (
                                        <button className="btn btn-primary mt-3" onClick={handlePreviousQuestion}>
                                            Previous Question
                                        </button>
                                    )}
                                    {currentQuestionIndex === questions.length - 1 ? (
                                        <button className="btn btn-success mt-3 ms-2" onClick={handleSubmitAnswers}>
                                            Send Answers
                                        </button>
                                    ) :
                                        <button className="btn btn-primary mt-3 ms-2 me-2" onClick={handleNextQuestion}>
                                            Next Question
                                        </button>
                                    }

                                    <button className="btn btn-secondary mt-3" onClick={() => setShowFeedbackModal(true)}>
                                        Give Feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showFeedbackModal ?
                        <Feedback setShowFeedbackModal={setShowFeedbackModal} questions={questions} currentQuestionIndex={currentQuestionIndex} />
                        : ''}
                </div>
                : <LoadingSpinner />}
        </>
    );
};

export default Questions;
