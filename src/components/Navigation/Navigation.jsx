import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggleMenu, closeMenu } from '../../redux/menu/menuSlice';
import { selectIsOpen } from '../../redux/menu/selectors';
import { useAuthorization } from '../../hooks';
import { UserMenu } from '../UserMenu';
import { AuthorizationMenu } from '../AuthorizationMenu';

import logo from '../../../public/white-note-logo.png';

export const Navigation = () => {
  const { isLoggedIn } = useAuthorization();
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-2 w-full sticky top-0 left-0 sm:flex gap-4 items-center justify-between z-0 container mx-auto">
      <NavLink to="/" className="block w-20">
        <img src={logo} width="100px" alt="logo" />
      </NavLink>
      <div
        onClick={() => dispatch(toggleMenu())}
        className="text-3xl absolute right-4 top-12 cursor-pointer sm:hidden"
      >
        <ion-icon name={isOpen ? 'close' : 'menu'}></ion-icon>
      </div>
      <nav
        className={`z-[-1] flex flex-col sm:flex-row gap-4 items-end pr-4 py-4 absolute right-0 bg-slate-200 w-full transition-all duration-300 ease-in ${
          isOpen ? 'right-0' : 'right-[-700px]'
        } sm:right-0 sm:w-auto`}
        onClick={() => dispatch(closeMenu())}
      >
        {isLoggedIn ? <UserMenu /> : <AuthorizationMenu />}
      </nav>
    </div>
  );
};
