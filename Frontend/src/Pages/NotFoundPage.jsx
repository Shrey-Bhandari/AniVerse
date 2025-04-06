import React from "react";
import styled from "styled-components";
import { FaSadTear, FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>
        <FaSadTear /> Page Not Found
      </ErrorTitle>
      <ErrorMessage>
        The anime dimension you're searching for has disappeared into the
        void...
      </ErrorMessage>

      <ErrorImage
        src="https://i.imgur.com/Q2BAOd2.png"
        alt="Lost anime character"
      />

      <ActionButtons>
        <HomeButton onClick={() => navigate("/")}>
          <FaHome /> Return Home
        </HomeButton>
        <SearchButton onClick={() => navigate("/search")}>
          <FaSearch /> Browse Anime
        </SearchButton>
      </ActionButtons>

      <FunFact>
        Did you know? In anime, characters who get lost often find hidden
        powers!
      </FunFact>
    </NotFoundContainer>
  );
};

// Styled Components
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: #0f0f12;
  color: white;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  background: linear-gradient(to right, #ff5722, #ff9800);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const ErrorTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  margin: 1rem 0 0.5rem;
  color: #ff5722;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: #aaa;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ErrorImage = styled.img`
  width: 300px;
  height: auto;
  margin: 1rem 0 2rem;
  filter: drop-shadow(0 0 10px rgba(255, 87, 34, 0.3));

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const HomeButton = styled(BaseButton)`
  background: #ff5722;
  border: none;
  color: white;

  &:hover {
    background: #ff7043;
    transform: translateY(-2px);
  }
`;

const SearchButton = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FunFact = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 87, 34, 0.1);
  border-left: 3px solid #ff5722;
  color: #aaa;
  max-width: 500px;
  font-style: italic;
`;

export default NotFoundPage;
