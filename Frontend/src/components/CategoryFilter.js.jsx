import React from "react";
import styled from "styled-components";
import CategoriesData from "../data/CategoriesData";

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <FilterContainer>
      {CategoriesData.map((category) => (
        <CategoryButton
          key={category._id}
          onClick={() => setActiveCategory(category.title)}
          isActive={activeCategory === category.title}
        >
          {category.title}
        </CategoryButton>
      ))}
    </FilterContainer>
  );
};

// Styled Components
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 1rem 0;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${({ isActive }) =>
    isActive ? "#FF5722" : "rgba(255, 255, 255, 0.1)"};
  color: ${({ isActive }) => (isActive ? "white" : "#aaa")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? "#FF5722" : "rgba(255, 255, 255, 0.2)"};
  }
`;

export default CategoryFilter;
