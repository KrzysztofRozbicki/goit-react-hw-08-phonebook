import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logIn } from '../../redux/authorization/operations';

export const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="authorization-form">
        <input type="text" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button type="submit">LOGIN</button>
      </form>
      <div className="text-center mt-4">
        <p>Don`t have account? </p>
        <p>
          <Link className="font-bold hover:text-teal-700" to="/register">
            Register
          </Link>{' '}
          now!
        </p>
      </div>
    </>
  );
};
