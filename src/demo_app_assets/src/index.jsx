import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './home.jsx';
import New from './new.jsx';
import Edit from './edit.jsx';

const app = document.getElementById('app');

render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/new" element={<New />}></Route>
      <Route path="/edit" element={<Edit />}></Route>
    </Routes>
  </Router>,
  app
);
