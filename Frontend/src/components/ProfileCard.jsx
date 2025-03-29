import React from "react";
import styled from "styled-components";
import {
  FaEdit,
  FaSignOutAlt,
  FaHistory,
  FaBookmark,
  FaStar,
} from "react-icons/fa";

const ProfileCard = ({ user }) => {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src={user.avatar} alt={user.username} />
          <EditOverlay>
            <FaEdit />
          </EditOverlay>
        </AvatarContainer>
        <UserInfo>
          <Username>{user.username}</Username>
          <UserEmail>{user.email}</UserEmail>
          <JoinDate>Member since {user.joinDate}</JoinDate>
        </UserInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatItem>
          <StatNumber>{user.stats.watched}</StatNumber>
          <StatLabel>Watched</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{user.stats.watchlist}</StatNumber>
          <StatLabel>Watchlist</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{user.stats.favorites}</StatNumber>
          <StatLabel>Favorites</StatLabel>
        </StatItem>
      </StatsContainer>

      <QuickLinks>
        <LinkItem>
          <LinkIcon>
            <FaHistory />
          </LinkIcon>
          <LinkText>Watch History</LinkText>
        </LinkItem>
        <LinkItem>
          <LinkIcon>
            <FaBookmark />
          </LinkIcon>
          <LinkText>My Lists</LinkText>
        </LinkItem>
        <LinkItem>
          <LinkIcon>
            <FaStar />
          </LinkIcon>
          <LinkText>Ratings</LinkText>
        </LinkItem>
      </QuickLinks>

      <LogoutButton>
        <FaSignOutAlt /> Sign Out
      </LogoutButton>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  width: 320px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1.2rem;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  font-size: 0.9rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.4rem;
`;

const UserEmail = styled.p`
  margin: 0.3rem 0;
  color: #aaa;
  font-size: 0.9rem;
`;

const JoinDate = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.8rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #252525;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff5722;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 87, 34, 0.1);
    transform: translateX(5px);
  }
`;

const LinkIcon = styled.div`
  color: #ff5722;
  margin-right: 1rem;
  font-size: 1.1rem;
`;

const LinkText = styled.div`
  color: white;
  font-size: 0.95rem;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 87, 34, 0.2);
  color: #ff5722;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 87, 34, 0.3);
  }
`;

export default ProfileCard;
