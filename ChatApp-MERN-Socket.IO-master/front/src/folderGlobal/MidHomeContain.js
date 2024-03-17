import React from 'react';
import { Link } from 'react-router-dom';
const MidHomeContain = () => {
  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Why Choose Us</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3" style={{ fontSize: '1.125rem', textAnchor: 'middle', WebkitUserSelect: 'none', MozUserSelect: 'none', userSelect: 'none' }}>
            <svg className="bi" width="1em" height="1em" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#collection"></use>
            </svg>
          </div>
          <h3 className="fs-2 text-body-emphasis">Unlock Your Happiness</h3>
          <p style={{ fontSize: '1.125rem' }}>
            Dive into our world of AI-powered insights with our Depression Prediction Chatbot. Discover the key to understanding your emotions and reclaiming your joy. Let us guide you to a brighter tomorrow.
          </p>
          <a href="#" className="icon-link" style={{ fontSize: '1.125rem' }}>
            Explore Now
            <svg className="bi" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#chevron-right"></use>
            </svg>
          </a>
        </div>
        {/* Repeat the above structure for the remaining components */}
        {/* Component 2 */}
        <div className="feature col">
          {/* Add relevant icon */}
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3" style={{ fontSize: '1.125rem', textAnchor: 'middle', WebkitUserSelect: 'none', MozUserSelect: 'none', userSelect: 'none' }}>
            <svg className="bi" width="1em" height="1em" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#people-circle"></use>
            </svg>
          </div>
          {/* Add relevant title */}
          <h3 className="fs-2 text-body-emphasis">Emotion Diary</h3>
          {/* Add relevant paragraph */}
          <p style={{ fontSize: '1.125rem' }}>
            Experience the power of self-awareness with our Emotion Diary. Witness your life's journey unfold as you capture every emotion. Uncover hidden patterns and chart a course towards inner peace.
          </p>
          <Link to="/diary">Go to Destination</Link>
        </div>
        {/* Component 3 */}
        <div className="feature col">
          {/* Add relevant icon */}
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3" style={{ fontSize: '1.125rem', textAnchor: 'middle', WebkitUserSelect: 'none', MozUserSelect: 'none', userSelect: 'none' }}>
            <svg className="bi" width="1em" height="1em" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#toggles2"></use>
            </svg>
          </div>
          {/* Add relevant title */}
          <h3 className="fs-2 text-body-emphasis">Tailored Wellness</h3>
          {/* Add relevant paragraph */}
          <p style={{ fontSize: '1.125rem' }}>
            Elevate your mental well-being with personalized activities curated just for you. Let our advanced algorithms guide you on a journey of self-discovery and growth. Unleash your potential and embrace a life of fulfillment.
          </p>
          <a href="#" className="icon-link" style={{ fontSize: '1.125rem' }}>
            Learn More
            <svg className="bi" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#chevron-right"></use>
            </svg>
          </a>
        </div>
        {/* Component 4 */}
        <div className="feature col">
          {/* Add relevant icon */}
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3" style={{ fontSize: '1.125rem', textAnchor: 'middle', WebkitUserSelect: 'none', MozUserSelect: 'none', userSelect: 'none' }}>
            <svg className="bi" width="1em" height="1em" style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}>
              <use xlinkHref="#toggles2"></use>
            </svg>
          </div>
          {/* Add relevant title */}
          <h3 className="fs-2 text-body-emphasis">Community Harmony</h3>
          {/* Add relevant paragraph */}
          <p style={{ fontSize: '1.125rem' }}>
            Join our vibrant community and foster meaningful connections. Experience a supportive environment where your voice matters. Let's build a world where everyone thrives together.
          </p>
          <Link to="/dashboard">Go to Destination</Link>
        </div>
      </div>
    </div>
  );
}

export default MidHomeContain;
