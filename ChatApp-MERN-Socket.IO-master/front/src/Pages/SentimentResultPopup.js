import React from 'react';
import '../styles/SentimentResult.css'
import { Link } from 'react-router-dom';

function SentimentResultPopup({ userID, sentimentResult, analyzeReasonsAndAdvice, saveDiaryEntry,closePopUp }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h3>Result</h3> 
          <button className="close-btn" onClick={saveDiaryEntry}>Save</button>
         

        </div>
        <div className="popup-body">
          <p><strong>User ID:</strong> {userID}</p>
          <p><strong>Sentiment:</strong> {sentimentResult}</p>
          <button className="close-btn" onClick={analyzeReasonsAndAdvice}>Analyze </button>
          <button className="close-btn" onClick={()=>{closePopUp(false)}}>close</button>
        </div>
      </div>
    </div>
  );
}

export default SentimentResultPopup;
