import React, { useState } from "react";
import styled from "styled-components";
import {
  FaEdit,
  FaHistory,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import AnimeData from "../data/AnimeVideoData";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("watching");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "AnimeLover42",
    avatar: "https://i.imgur.com/J3bK5WX.png",
    joinDate: "October 2023",
    bio: "Hardcore anime fan | Collector of waifus | Currently binge-watching One Piece",
    stats: {
      watched: 247,
      watching: 12,
      planToWatch: 43,
    },
  });

  const [tempBio, setTempBio] = useState(userData.bio);

  // Sample user anime lists
  const watchingList = AnimeData.slice(0, 4);
  const completedList = AnimeData.slice(2, 6);
  const planToWatchList = AnimeData.slice(4, 8);

  const handleSaveBio = () => {
    setUserData({ ...userData, bio: tempBio });
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      {/* Profile Header */}
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src={userData.avatar} alt="Profile" />
          <EditOverlay onClick={() => {}}>
            <FaEdit />
          </EditOverlay>
        </AvatarContainer>

        <ProfileInfo>
          <Username>{userData.username}</Username>
          <JoinDate>Member since {userData.joinDate}</JoinDate>

          {isEditing ? (
            <BioEdit>
              <BioTextarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                maxLength="150"
              />
              <BioActions>
                <BioButton onClick={handleSaveBio}>Save</BioButton>
                <BioButton cancel onClick={() => setIsEditing(false)}>
                  Cancel
                </BioButton>
              </BioActions>
            </BioEdit>
          ) : (
            <Bio>
              {userData.bio}
              <EditIcon onClick={() => setIsEditing(true)}>
                <FaEdit size={14} />
              </EditIcon>
            </Bio>
          )}

          <StatsContainer>
            <StatItem>
              <StatNumber>{userData.stats.watched}</StatNumber>
              <StatLabel>Watched</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userData.stats.watching}</StatNumber>
              <StatLabel>Watching</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userData.stats.planToWatch}</StatNumber>
              <StatLabel>Plan to Watch</StatLabel>
            </StatItem>
          </StatsContainer>
        </ProfileInfo>
      </ProfileHeader>

      {/* Profile Navigation */}
      <ProfileNav>
        <NavItem
          active={activeTab === "watching"}
          onClick={() => setActiveTab("watching")}
        >
          <FaHistory /> Currently Watching
        </NavItem>
        <NavItem
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          <FaBookmark /> Completed
        </NavItem>
        <NavItem
          active={activeTab === "planToWatch"}
          onClick={() => setActiveTab("planToWatch")}
        >
          <FaBookmark /> Plan to Watch
        </NavItem>
      </ProfileNav>

      {/* Profile Content */}
      <ProfileContent>
        {activeTab === "watching" && (
          <AnimeGrid>
            {watchingList.map((anime) => (
              <AnimeCard key={anime.name} anime={anime} showProgress />
            ))}
          </AnimeGrid>
        )}

        {activeTab === "completed" && (
          <AnimeGrid>
            {completedList.map((anime) => (
              <AnimeCard key={anime.name} anime={anime} showCheckmark />
            ))}
          </AnimeGrid>
        )}

        {activeTab === "planToWatch" && (
          <AnimeGrid>
            {planToWatchList.map((anime) => (
              <AnimeCard key={anime.name} anime={anime} showAddButton />
            ))}
          </AnimeGrid>
        )}
      </ProfileContent>

      {/* Profile Footer */}
      <ProfileFooter>
        <FooterButton>
          <FaCog /> Settings
        </FooterButton>
        <FooterButton>
          <FaSignOutAlt /> Sign Out
        </FooterButton>
      </ProfileFooter>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  padding: 2rem 5%;
  background: #0f0f12;
  color: white;
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff5722;
`;

const EditOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ff5722;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem;
  color: #ff5722;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const JoinDate = styled.p`
  color: #aaa;
  margin: 0 0 1rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Bio = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const EditIcon = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #aaa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5722;
  }
`;

const BioEdit = styled.div`
  margin-bottom: 1.5rem;
`;

const BioTextarea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  resize: none;
  height: 100px;
  margin-bottom: 0.5rem;
`;

const BioActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BioButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.cancel ? "rgba(255, 255, 255, 0.1)" : "#FF5722"};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.cancel ? "rgba(255, 255, 255, 0.2)" : "#ff7043"};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff5722;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

const ProfileNav = styled.nav`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const NavItem = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#FF5722" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#aaa")};
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ProfileContent = styled.div`
  margin-bottom: 2rem;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ProfileFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export default ProfilePage;
