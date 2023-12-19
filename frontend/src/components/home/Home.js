
import React, { useState } from 'react';
import { Button, Container, Card, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { API_URL, doApiPost } from '../../services/apiServices';
import { isAuthenticated } from '../../utils/auth';

const Home = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");
    const isLoggedIn = isAuthenticated();
    const start = () => {
        navigate('/questions');
    };

    const handleFeedbackOpen = () => setShowFeedbackModal(true);
    const handleFeedbackChange = (e) => setFeedback(e.target.value);
    const handleFeedbackClose = () => setShowFeedbackModal(false);

    const submitFeedback = async () => {
        if (feedback.length === 0) {
            alert("Type a feedback into the text field.")
            return;
        }
        try {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            await doApiPost(API_URL + "/feedbacks", { userId: userId, text: feedback })
            handleFeedbackClose();
            setFeedback("")
            alert("Thanks for giving us Your opinion!")
        } catch (err) {
            console.error('Error submitting general feedback:', err);
        }
    };

    return (
        <Container className="justify-content-center align-items-center home-container">
            <Card className="home-card text-center">
                <Card.Body>
                    <Card.Title>Welcome to Our Questionnaire {user && user.username}!</Card.Title>
                    <Card.Text>
                        We're so glad you're here. This questionnaire is designed to understand your preferences and thoughts.
                        Your input is valuable to us, and we appreciate the time you're taking to help us. Let's get started!
                    </Card.Text>
                    <Button variant="primary" onClick={() => start()}>Start Questionnaire</Button>
                </Card.Body>
            </Card>
            {isLoggedIn &&
                <div className="feedback-icon" onClick={handleFeedbackOpen}>
                    💬
                </div>
            }
            <Modal show={showFeedbackModal} onHide={handleFeedbackClose}>
                <Modal.Header closeButton>
                    <Modal.Title>General Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Your Feedback</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={feedback}
                                onChange={handleFeedbackChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFeedbackClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitFeedback}>
                        Submit Feedback
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default Home;
