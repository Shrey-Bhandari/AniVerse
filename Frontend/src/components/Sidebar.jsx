import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaFire,
  FaCalendarAlt,
  FaHistory,
  FaUser,
  FaCog,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Toggle class on parent element to adjust main content
    document.querySelector('.layout')?.classList.toggle('sidebar-expanded');
  };

  const navItems = [
    { icon: <FaHome size={20} />, label: "Home", path: "/" },
    { icon: <FaFire size={20} />, label: "Trending", path: "/trending" },
    { icon: <FaCalendarAlt size={20} />, label: "Schedule", path: "/schedule" },
    { icon: <FaHistory size={20} />, label: "History", path: "/history" },
    { icon: <FaUser size={20} />, label: "Profile", path: "/profile" },
    { icon: <FaCog size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <SidebarContainer
      $collapsed={isCollapsed}
      $hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ToggleButton
        onClick={toggleSidebar}
        $collapsed={isCollapsed}
        $hovered={isHovered}
      >
        <FaChevronRight size={16} />
      </ToggleButton>

      <NavItems>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.path}
            $collapsed={isCollapsed}
            $hovered={isHovered}
          >
            <IconWrapper $collapsed={isCollapsed}>{item.icon}</IconWrapper>
            <Label $collapsed={isCollapsed} $hovered={isHovered}>
              {item.label}
            </Label>
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
  top: 60px; /* Start below navbar */
  height: calc(100vh - 60px); /* Take full remaining height */
  width: ${({ $collapsed, $hovered }) =>
    $collapsed ? ($hovered ? "200px" : "60px") : "200px"};
  background-color: #1a1a1a;
  padding: 0;
  z-index: 900;
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ff5722;
  cursor: pointer;
  margin: 15px 0;
  padding: 5px;
  align-self: center;
  transition: all 0.2s ease;
  border-radius: 50%;
  transform: ${({ $collapsed }) =>
    $collapsed ? "rotate(0deg)" : "rotate(180deg)"};
  opacity: ${({ $hovered, $collapsed }) =>
    $hovered || !$collapsed ? "1" : "0.5"};

  &:hover {
    background-color: rgba(255, 87, 34, 0.2);
    opacity: 1;
  }
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $collapsed, $hovered }) =>
    $collapsed && !$hovered ? "center" : "flex-start"};
  padding: 0 10px;
  gap: 5px;
  width: 100%;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #b3b3b3;
  padding: 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: ${({ $collapsed, $hovered }) =>
    $collapsed && !$hovered ? "auto" : "calc(100% - 10px)"};
  justify-content: ${({ $collapsed, $hovered }) =>
    $collapsed && !$hovered ? "center" : "flex-start"};

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Label = styled.span`
  font-size: 0.95rem;
  margin-left: 15px;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  opacity: ${({ $collapsed, $hovered }) =>
    $collapsed && !$hovered ? "0" : "1"};
  width: ${({ $collapsed, $hovered }) =>
    $collapsed && !$hovered ? "0" : "auto"};
  overflow: hidden;
`;

export default Sidebar;
