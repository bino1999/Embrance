import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Spinner, Card } from 'react-bootstrap';
import SentimentResultPopup from './SentimentResultPopup';
import { useUserProfile } from './UserProfileContext';
import Header from '../folderGlobal/Header';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function DiaryMain() {
  const [textInput, setTextInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { userID } = useUserProfile();

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const analyzeSentiment = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/analyze_sentiment', { text: textInput });
      const data = response.data;
      setSentimentResult(data.sentiment);
      setShowPopup(true);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeReasonsAndAdvice = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/generate_advice', { text: textInput }); // Pass your reasons here
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error analyzing reasons and advice:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const saveDiaryEntry = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/diary/diary-entry', { user: userID, entry: textInput, sentiment: sentimentResult });
      const data = response.data;
      console.log(data.diaryEntry);
    } catch (error) {
      console.error('Error saving diary entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <Container style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '100px' }}>
        <Card style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Card.Header style={{ backgroundColor: '#075e54', color: '#fff', borderRadius: '8px 8px 0 0', padding: '10px', fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {userID}
            <Link to={`/result/${userID}`} style={{ color: '#fff', textDecoration: 'none' }}>
              Diary history
            </Link>
          </Card.Header>
          <Card.Body style={{ padding: '20px' }}>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={textInput}
                  onChange={handleTextInputChange}
                  placeholder="Share your thoughts..."
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', resize: 'none' }}
                />
              </Form.Group>
              <Button variant="primary" onClick={analyzeSentiment} disabled={loading} style={{ backgroundColor: '#075e54', borderRadius: '8px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Analyze Sentiment'}
              </Button>
            </Form>

            {showPopup && (
              <SentimentResultPopup
                userID={userID}
                sentimentResult={sentimentResult}
                analyzeReasonsAndAdvice={analyzeReasonsAndAdvice}
                saveDiaryEntry={saveDiaryEntry}
                closePopUp={setShowPopup}
              />
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DiaryMain;