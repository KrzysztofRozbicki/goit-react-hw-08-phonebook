import logo from '../../../public/white-note-logo.png';
import people from '../../../public/connect-people.jpg';
import { Link } from 'react-router-dom';
import { useAuthorization } from '../../hooks';

export const Home = () => {
  const { isLoggedIn, user } = useAuthorization();

  return (
    <section className="flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold my-4">White Note</h1>
      <div className="flex items-center">
        <img src={people} width="400px" alt="connnecting people" />
        <article>
          <h2 className="text-3xl font-semibold my-4">
            {isLoggedIn ? `Welcome back ${user.name}` : `All your contacts`}
          </h2>

          <p className="mb-6 tex-lg font-semibold">Connect with your people!</p>
          {isLoggedIn ? (
            <Link
              to="/contacts"
              className="text-3xl font-bold mb-4 text-stone-800 hover:text-teal-700"
            >
              YOUR CONTACTS
            </Link>
          ) : (
            <Link
              to="/register"
              className="text-3xl font-bold mb-4 text-stone-800 hover:text-teal-700"
            >
              REGISTER NOW
            </Link>
          )}
        </article>
      </div>
      <div className="flex items-center gap-8">
        <img src={logo} width="150px" alt="logo" />
        <div className="text-left text-2xl font-semibold">
          <p>Free calls</p>
          <p>Free messages</p>
          <p>Free meetings</p>
        </div>
      </div>
      {isLoggedIn ? (
        <Link
          to="/contacts"
          className="text-3xl font-bold mb-4 text-stone-800 hover:text-teal-700"
        >
          YOUR CONTACTS
        </Link>
      ) : (
        <Link
          to="/register"
          className="text-3xl font-bold mb-4 text-stone-800 hover:text-teal-700"
        >
          REGISTER NOW
        </Link>
      )}
    </section>
  );
};
