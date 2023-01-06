import React , {useEffect , useState} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {getPersonsFetch} from './personState';
import Home from './Home/Home';
import UserDetails from './UserDetails/UserDetails';

function App() {
  const persons = useSelector(state => state.persons.persons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonsFetch());
  }, [dispatch])

  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home persons={persons} />} />
          <Route path="/users/*" exact element={<UserDetails persons={persons} />} />
          </Routes>
      </Router>
  );
}

export default App;
