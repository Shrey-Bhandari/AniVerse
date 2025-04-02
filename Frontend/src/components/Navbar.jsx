import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <NavContainer $scrolled={isScrolled}>
      <NavLeft>
        <Logo to="/">ANIVERSE</Logo>
      </NavLeft>

      <NavCenter>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>
        </SearchForm>
      </NavCenter>

      <NavRight>
        <NavLink to="/login">
          <FaSignInAlt /> Login
        </NavLink>
        <UserIcon>
          <FaUserCircle />
        </UserIcon>
      </NavRight>
    </NavContainer>
  );
};

// Styled Components
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 1000;
  background-color: ${({ $scrolled }) =>
    $scrolled ? "rgba(20, 20, 20, 0.95)" : "rgba(20, 20, 20, 0.8)"};
  backdrop-filter: blur(${({ $scrolled }) => ($scrolled ? "10px" : "5px")});
  transition: all 0.3s ease;
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(255, 87, 34, 0.3)" : "none"};
`;

const NavLeft = styled.div`
  flex: 1;
`;

const Logo = styled(Link)`
  color: #ff5722;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  &:hover {
    opacity: 0.9;
  }
`;

const NavCenter = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 0 1rem;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #ff5722;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff7043;
  }
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5722;
  }
`;

const UserIcon = styled.div`
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5722;
    transform: scale(1.1);
  }
`;

export default Navbar;
