import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Explore from './pages/explorer';
import Viewer from './pages/viewer';


function App() {
  return (
     <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Explore} />
          <Route path='/viewer' component={Viewer} />
          <Route path='/explorer' component={Explore} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
