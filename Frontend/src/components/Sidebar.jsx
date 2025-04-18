import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  FaHome,
  FaFire,
  FaCalendarAlt,
  FaHistory,
  FaUser,
  FaCog,
  FaChevronRight,
  FaSearch,
  FaCompass
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Add/remove class from body for main content adjustment
    if (isCollapsed) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  };

  const navItems = [
    { icon: <FaHome size={20} />, label: "Home", path: "/" },
    { icon: <FaFire size={20} />, label: "Trending", path: "/trending" },
    { icon: <FaCalendarAlt size={20} />, label: "Schedule", path: "/schedule" },
    { icon: <FaCompass size={20} />, label: "Explore", path: "/explore" },
    { icon: <FaSearch size={20} />, label: "Browse", path: "/search" },
    { icon: <FaHistory size={20} />, label: "History", path: "/history" },
    { icon: <FaUser size={20} />, label: "Profile", path: "/profile" },
    { icon: <FaCog size={20} />, label: "Settings", path: "/settings" },
  ];

  // Don't render sidebar on watch pages
  if (location.pathname.includes('/watch')) {
    return null;
  }

  return (
    <SidebarContainer
      $collapsed={isCollapsed}
      $hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LogoContainer $collapsed={isCollapsed} $hovered={isHovered}>
        {(!isCollapsed || isHovered) ? (
          <LogoText>ANIVERSE</LogoText>
        ) : (
          <LogoIcon>A</LogoIcon>
        )}
      </LogoContainer>

      <NavItems>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.path}
            $collapsed={isCollapsed}
            $hovered={isHovered}
            $active={location.pathname === item.path}
          >
            <IconWrapper $collapsed={isCollapsed}>
              {item.icon}
              {(!isCollapsed || isHovered) && 
                <ItemTooltip className="tooltip">{item.label}</ItemTooltip>
              }
            </IconWrapper>
            <Label $collapsed={isCollapsed} $hovered={isHovered}>
              {item.label}
            </Label>
          </NavItem>
        ))}
      </NavItems>
      
      <ToggleButton
        onClick={toggleSidebar}
        $collapsed={isCollapsed}
        $hovered={isHovered}
      >
        <FaChevronRight size={16} />
      </ToggleButton>
    </SidebarContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $collapsed, $hovered }) =>
    $collapsed ? ($hovered ? "200px" : "60px") : "200px"};
  background-color: #0f0f0f;
  border-right: 1px solid #222;
  padding: 0;
  z-index: 900;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${({ $hovered, $collapsed }) => 
    ($hovered && $collapsed) ? '0 0 20px rgba(255, 51, 51, 0.15)' : 'none'};
`;

const LogoContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3333;
  font-weight: bold;
  letter-spacing: 1px;
  border-bottom: 1px solid #222;
  margin-bottom: 15px;
  transition: all 0.3s ease;
`;

const LogoText = styled.div`
  font-size: 1.4rem;
  animation: ${fadeIn} 0.3s ease;
`;

const LogoIcon = styled.div`
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ff3333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ff3333;
  cursor: pointer;
  margin: 15px auto;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  transform: ${({ $collapsed }) =>
    $collapsed ? "rotate(0deg)" : "rotate(180deg)"};
  background-color: rgba(255, 51, 51, 0.1);
  width: 32px;
  height: 32px;

  &:hover {
    background-color: rgba(255, 51, 51, 0.2);
    transform: ${({ $collapsed }) =>
      $collapsed ? "rotate(0deg) scale(1.1)" : "rotate(180deg) scale(1.1)"};
  }
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 8px;
  width: 100%;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff3333;
    border-radius: 10px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? 'white' : '#b3b3b3'};
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'linear-gradient(90deg, #ff3333, #ff5555)' : 'transparent'};
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #ff3333;
    transform: ${props => props.$active ? 'scaleY(1)' : 'scaleY(0)'};
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(90deg, #ff3333, #ff5555)' : 'rgba(255, 51, 51, 0.1)'};
    color: white;
    transform: translateX(5px);
    
    &:before {
      transform: scaleY(1);
    }
  }

  &.active {
    background: linear-gradient(90deg, #ff3333, #ff5555);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 51, 51, 0.3);
    
    &:before {
      transform: scaleY(1);
    }
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  margin-right: ${props => props.$collapsed ? '0' : '12px'};
  
  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

const ItemTooltip = styled.span`
  position: absolute;
  left: 45px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  z-index: 10;
  white-space: nowrap;
  pointer-events: none;
`;

const Label = styled.span`
  font-size: 0.95rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ $collapsed, $hovered }) => $collapsed && !$hovered ? "0" : "1"};
  transform: ${({ $collapsed, $hovered }) => $collapsed && !$hovered ? "translateX(10px)" : "translateX(0)"};
  animation: ${({ $collapsed, $hovered }) => (!$collapsed || $hovered) ? slideIn : 'none'} 0.3s ease;
  white-space: nowrap;
`;

export default Sidebar;
