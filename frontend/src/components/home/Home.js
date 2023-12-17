import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './home.css'; 

const Home = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    const start = () => {
        navigate('/questions')
    }

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
        </Container>
    );
};

export default Home;
