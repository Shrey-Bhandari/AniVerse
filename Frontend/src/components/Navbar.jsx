import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaUserCircle, FaSignInAlt, FaBell, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
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
      setShowSearchBar(false);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Theme implementation would go here
  };

  return (
    <NavContainer $scrolled={isScrolled}>
      <NavLeft>
        <Logo to="/">
          <LogoText>ANIVERSE</LogoText>
        </Logo>
      </NavLeft>

      <NavCenter $show={showSearchBar}>
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
        <IconButton onClick={toggleSearchBar} $mobile>
          <FaSearch />
        </IconButton>
        <IconButton>
          <FaBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
        <NavLink to="/login">
          <FaSignInAlt /> <LinkText>Login</LinkText>
        </NavLink>
        <UserIconContainer>
          <UserIcon>
            <FaUserCircle />
          </UserIcon>
          <UserMenu>
            <MenuItem to="/profile">Profile</MenuItem>
            <MenuItem to="/settings">Settings</MenuItem>
            <MenuItem to="/logout">Logout</MenuItem>
          </UserMenu>
        </UserIconContainer>
      </NavRight>
    </NavContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled Components
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  z-index: 1000;
  background-color: ${({ $scrolled }) =>
    $scrolled ? "rgba(10, 10, 10, 0.95)" : "rgba(10, 10, 10, 0.8)"};
  backdrop-filter: blur(${({ $scrolled }) => ($scrolled ? "10px" : "5px")});
  transition: all 0.3s ease;
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(255, 51, 51, 0.3)" : "none"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none"};
`;

const NavLeft = styled.div`
  flex: 1;
`;

const LogoText = styled.span`
  background: linear-gradient(90deg, #ff3333, #ff5555);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  display: inline-block;
  
  &:hover ${LogoText} {
    animation: ${pulse} 1s ease-in-out;
  }
`;

const NavCenter = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    position: absolute;
    top: ${({ $show }) => ($show ? "60px" : "-60px")};
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    padding: 10px;
    opacity: ${({ $show }) => ($show ? "1" : "0")};
    visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.3s ease;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 0 1rem;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #ff3333;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5555;
    transform: translateX(2px);
  }
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background: rgba(255, 51, 51, 0.1);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const LinkText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: white;
    background: rgba(255, 51, 51, 0.1);
    transform: translateY(-2px);
  }
  
  @media (min-width: 769px) {
    display: ${({ $mobile }) => ($mobile ? "none" : "flex")};
  }
`;

const ThemeToggle = styled(IconButton)`
  padding: 0.5rem;
  
  &:hover {
    transform: rotate(30deg) translateY(-2px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff3333;
  color: white;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
`;

const UserIconContainer = styled.div`
  position: relative;
  
  &:hover > div:last-child {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const UserIcon = styled.div`
  color: #e0e0e0;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff3333;
    transform: scale(1.1);
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #1a1a1a;
  border-radius: 8px;
  width: 150px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 10;
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 10px;
    width: 12px;
    height: 12px;
    background: #1a1a1a;
    transform: rotate(45deg);
  }
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #e0e0e0;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 51, 51, 0.1);
    color: #ff3333;
    padding-left: 20px;
  }
`;

export default Navbar;
