import { useDispatch } from 'react-redux';
import { register } from '../../redux/authorization/operations';

export const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    dispatch(
      register({
        name: form.elements.login.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="authorization-form">
      <input type="text" name="login" placeholder="login" required />
      <input type="email" name="email" placeholder="email" required />
      <input type="password" name="password" placeholder="password" required />
      <button type="submit">REGISTER</button>
    </form>
  );
};
