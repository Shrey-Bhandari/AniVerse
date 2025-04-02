import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaFire,
  FaCalendarAlt,
  FaHistory,
  FaUser,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaFire />, label: "Trending", path: "/trending" },
    { icon: <FaCalendarAlt />, label: "Schedule", path: "/schedule" },
    { icon: <FaHistory />, label: "History", path: "/history" },
    { icon: <FaUser />, label: "Profile", path: "/profile" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  return (
    <SidebarContainer $collapsed={isCollapsed}>
      <ToggleButton onClick={toggleSidebar}>
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </ToggleButton>

      <NavItems>
        {navItems.map((item, index) => (
          <NavItem key={index} to={item.path} $collapsed={isCollapsed}>
            <IconWrapper $collapsed={isCollapsed}>{item.icon}</IconWrapper>
            {!isCollapsed && <Label>{item.label}</Label>}
          </NavItem>
        ))}
      </NavItems>
    </SidebarContainer>
  );
};

// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "250px")};
  background-color: #1a1a1a;
  color: white;
  padding: 1rem;
  z-index: 900;
  transition: all 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ff5722;
  font-size: 1.2rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 2rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 87, 34, 0.2);
    transform: scale(1.1);
  }
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #b3b3b3;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: ${({ $collapsed }) => ($collapsed ? "fit-content" : "100%")};
  margin: 0 auto;

  &:hover {
    background-color: #2a2a2a;
    color: white;
  }

  &.active {
    background-color: #ff5722;
    color: white;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.3rem;
  margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "1rem")};
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? "0" : "1")};
  transition: opacity 0.3s ease;
`;

export default Sidebar;
