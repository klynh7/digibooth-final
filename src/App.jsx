import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';

import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import WriteRev from './pages/WriteRev';
import Spotlight from './pages/Spotlight';
import History from './pages/History';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import SessionStart from './pages/SessionStarts';
import SessionEnd from './pages/SessionEnd';
import FrameC from './pages/FrameC';
import FrameL from './pages/FrameL';
import Stickers from './pages/Stickers';

function App() {
  return (
    <div className="App">
      <Sidebar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session-starts" element={<SessionStart />} />
          <Route path='/about' element={<About />}  />
          <Route path='/privacy' element={<Privacy />}  />
          <Route path='/faq' element={<Faq />}  />
          <Route path='/contact' element={<Contact />}  />
          <Route path='/reviews' element={<Reviews />}  />
          <Route path='/spotlight' element={<Spotlight />}  />
          <Route path='/history' element={<History />}  />
          <Route path='/log-in' element={<LogIn />}  />
          <Route path='/write-review' element={<WriteRev />}  />
          <Route path='/sign-up' element={<SignUp />}  />
          <Route path='/frame-c' element={<FrameC />}  />
          <Route path='/frame-l' element={<FrameL />}  />
          <Route path='/stickers' element={<Stickers />}  />
          <Route path='/session-end' element={<SessionEnd />}  />
        </Routes>
      </main>
      
      <footer className="branding">
        digibooth by @barisdua
      </footer>
    </div>
  );
}

export default App;