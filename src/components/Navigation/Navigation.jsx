import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import css from './navigation.module.css';

import { useAuthorization } from '../../hooks';
import { UserMenu } from '../UserMenu';
import { AuthorizationMenu } from '../AuthorizationMenu';

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  background-color: lightgray;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  &:hover {
    outline: 2px solid black;
    background-color: darkgray;
    color: white;
  }

  &.active {
    background-color: darkgray;
    color: white;
  }
`;

export const Navigation = () => {
  const { isLoggedIn } = useAuthorization();

  return (
    <header className={css.header}>
      <StyledLink to="/">
        <h1> Phonebook - logo</h1>
      </StyledLink>
      {isLoggedIn ? <UserMenu /> : <AuthorizationMenu />}
    </header>
  );
};
