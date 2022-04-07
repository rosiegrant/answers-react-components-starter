import './App.css';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react'
import UniversalPage from './pages/UniversalPage'
import ParksPage from './pages/ParksPage'
import Navigation from './components/Navigation'

import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <div className="App p-4">
      <AnswersHeadlessProvider
        apiKey='06812f79aa06d16a1c6b83d76b5b4350'
        experienceKey='national-parks'
        locale='en'
      >

        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<UniversalPage />} />
            <Route path='parks' element={<ParksPage />} />
          </Routes>
        </Router>

      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
