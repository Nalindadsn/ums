import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import UserList from './screens/UserList/UserList';
import SingleNote from './screens/SingleNote/SingleNote';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/SingleNote/CreateNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import CreateUser from './screens/SingleUser/CreateUser';
import SingleUser from './screens/SingleUser/SingleUser';
import MyNotesUser from './screens/MyNotes/MyNotesUser';
import UserListAdmin from './screens/UserListAdmin/UserListAdmin';
import UserListBoatOwner from './screens/UserListBoatOwner/UserListBoatOwner';
import UserListCustomer from './screens/UserListCustomer/UserListCustomer';
import UserListInventoryManager from './screens/UserListInventoryManager/UserListInventoryManager';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/userActivity"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route
          path="/activityUser"
          component={({ history }) => (
            <MyNotesUser search={search} history={history} />
          )}
        />
        <Route
          path="/userList"
          component={({ history }) => (
            <UserList search={search} history={history} />
          )}
        />
        <Route
          path="/userListAdmin"
          component={({ history }) => (
            <UserListAdmin search={search} history={history} />
          )}
        />
        <Route
          path="/userListCustomer"
          component={({ history }) => (
            <UserListCustomer search={search} history={history} />
          )}
        />
        <Route
          path="/userListBoatOwner"
          component={({ history }) => (
            <UserListBoatOwner search={search} history={history} />
          )}
        />
        <Route
          path="/userListInventoryManager"
          component={({ history }) => (
            <UserListInventoryManager search={search} history={history} />
          )}
        />
        <Route path="/user/:id" component={SingleUser} />
        <Route path="/createuser" component={CreateUser} />;
        {/* <Route path="/userActivity" component={SingleNote} /> */}
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
