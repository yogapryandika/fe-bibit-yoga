import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Navbar from './Components/NavBar';

import MovieDetail from './features/MovieDetail';
import Movies from './features/Movies'

import './sass/main.scss'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/:id" component={MovieDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
