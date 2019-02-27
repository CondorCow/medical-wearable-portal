import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Portal from './containers/Portal/Portal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Portal />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
