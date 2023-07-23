import { useAuthorization } from '../../hooks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectContacts } from '../../redux/contacts/selectors';

export const User = () => {
  const { user } = useAuthorization();
  const numberOfContacts = useSelector(selectContacts).length;
  return (
    <section className="flex flex-col gap-4 items-center">
      <h2 className="text-4xl font-bold my-8">This is User website</h2>
      <p>You will be able to edit your account detail very soon</p>
      <p>These are your details:</p>

      <img
        src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
        alt="avatar"
        className="w-20 rounded-full border-2"
      />
      <div className="grid grid-cols-2 gap-2 text-lg">
        <p className="font-bold">User:</p>
        <p>{user.name}</p>
        <p className="font-bold">E-mail:</p>
        <p>{user.email}</p>
        <Link
          className="font-bold hover:text-teal-700 hover:cursor-pointer"
          to="/contacts"
        >
          Contacts:
        </Link>
        <Link
          className="font-bold hover:text-teal-700 hover:cursor-pointer"
          to="/contacts"
        >
          {numberOfContacts}
        </Link>
      </div>
    </section>
  );
};
