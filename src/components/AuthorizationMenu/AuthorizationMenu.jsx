import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import css from './authorizationMenu.module.css';

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

export const AuthorizationMenu = () => {
  return (
    <nav className={css.menu}>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/register">Register</StyledLink>
    </nav>
  );
};
