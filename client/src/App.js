import './App.css';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import Detail from './components/detail/Detail';
import NewBreed from './components/newbreed/NewBreed';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';

function App() {
  return (
    <div className="App container">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/dogs" exact component={Main} />
          <Route path="/dogs/new" exact component={NewBreed} />
          <Route path="/dogs/:id" exact component={Detail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
