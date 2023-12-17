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
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const questionsFetched = await doApiGet(API_URL + '/questions/all');
            setQuestions(questionsFetched);
            setLoading(false);
        } catch (err) {
            navigate("/");
            console.error('Error fetching questions:', err);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (questions.length > 0 && questions[currentQuestionIndex]) {
            // Find the answer object for the current question
            const answerObj = answers.find(ans => ans.questionId === questions[currentQuestionIndex].id);
            // Set the currentAnswer to the answer string if it exists, or to an empty string if not
            setCurrentAnswer(answerObj ? answerObj.answer : '');
        }
    }, [currentQuestionIndex, questions, answers]);

    const handleAnswerChange = (e) => {
        setCurrentAnswer(e.target.value);
    };

    const updateAnswers = () => {
        const questionId = questions[currentQuestionIndex].id;
        const existingAnswerIndex = answers.findIndex(ans => ans.questionId === questionId);

        if (existingAnswerIndex >= 0) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = { questionId, answer: currentAnswer };
            setAnswers(updatedAnswers);
        } else {
            setAnswers(prevAnswers => [...prevAnswers, { questionId, answer: currentAnswer }]);
        }
    };


    const handleNextQuestion = () => {
        updateAnswers();
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            updateAnswers();
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    useEffect(() => {
        // Start the timer when the component mounts
        const timerStart = Date.now();
        setStartTime(timerStart);

        // Clear the timer when the component unmounts
        return () => {
            setElapsedTime(0);
        };
    }, []);

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startTime]);



    const updateElapsedTime = () => {
        if (startTime) {
            const now = Date.now();
            setElapsedTime(now - startTime);
        }
    };



    const handleSubmitAnswers = async () => {
        updateElapsedTime();
        updateAnswers();
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            const submitAnswers = async () => {
                const id = JSON.parse(localStorage.getItem('user')).id;
                const time = Math.floor(elapsedTime / 1000);
                try {
                    await doApiPost(API_URL + "/responses", { answers, userId: id, elapsedTime: time });
                    navigate("/");
                    alert("Thanks for answering our questions!");
                } catch (err) {
                    console.error('Error submitting answers:', err);
                }
            };

            submitAnswers();
            setIsSubmitting(false);
        }
    }, [isSubmitting, answers, elapsedTime, navigate]);

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

                                    <div />
                                </div>
                            </div>
                            <div className="timer-container fixed-bottom mb-3">
                                <div className="timer">
                                    {formatTime(elapsedTime)}
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
