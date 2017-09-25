import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import ProfileCard from './ProfileCard';
import pick from 'lodash/pick' ;
import map from 'lodash/map';
import './Application.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.usersRef = null;
    this.userRef = null;
    this.state = {
      user: null,
      users: {}
    };

    this.usersRef = database.ref('/users');
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user });

      let userRef = this.usersRef.child(user.uid);

      // check if user is saved and save it if needed
      userRef.once('value').then(snapshot => {
        if (snapshot.val()) return;
        const userInfo = pick(user, ['displayName', 'photoURL', 'email']);
        userRef.set(userInfo);
      });

      // listen for new users
      this.usersRef.on('value', snapshot => {
        this.setState({ users: snapshot.val() });
      });
    })
  }

  render() {
    const { user, users } = this.state;

    return (
      <div className="App">
        <header className="App--header">
          <h1>Social Animals</h1>
        </header>
        {
          user 
          ? <div>
              <section className="ProfileCards">
                {
                  map(users, (user, uid) => {
                    return <ProfileCard key={uid} user={user} uid={uid} />
                  })
                }
              </section>
              <CurrentUser user={user} />
            </div>
          : <SignIn />
        }
      </div>
    );
  }
}

export default App;
