import React, { useState } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import MidHomeContain from './MidHomeContain';
import AboutUs from './AboutUs';

function HomeContain() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" onClick={toggleTheme}>
          {/* Add your theme toggle icon here */}
        </button>
      </div>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Carousel />
      </main>

      <div >
        <MidHomeContain  />
      </div>

      <div >
      <AboutUs  />
    </div>

      {/* Footer Component */}
    </div>
  );
}

export default HomeContain;
