import Button from '../components/Button';
import Channel from '../components/Channel';
import { useEffect, useState } from 'react';
import firebase from '../data/firebase';
import styles from '../styles/Home.module.css';
import DarkProvider from '../hooks/DarkProvider';
import { useDarkModeContext } from '../hooks/DarkProvider';
import { setThemeMode } from '../styles/styles';

const auth = firebase.auth();
const db = firebase.firestore();

export default function Home() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const { mode } = useDarkModeContext();
  const themeMode = mode || 'light';
  const css = setThemeMode(themeMode);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      {
        user ? setUser(user) : setUser(null);
      }
    });

    {
      initializing && setInitializing(false);
    }

    // cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return 'Loading......';

  return (
    <DarkProvider>
      <div className={css.home_wrapper}>
        <header>
          <span className={styles.title}>Chat App</span>
          {user && (
            <button className={styles.signOut} onClick={signOut}>
              Sign out
            </button>
          )}
        </header>
        {user ? (
          <div className={styles.main_content}>
            <Channel user={user} db={db} />
          </div>
        ) : (
          <div className={styles.signIn}>
            <Button onClick={signInWithGoogle}> Sign in with google</Button>
          </div>
        )}
      </div>
    </DarkProvider>
  );
}
