import React from "react";
import styled from "styled-components";
const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
`;
const Title = styled.p`
  color: grey;
  font-size: 18px;
`;
const ContentDiv = styled.div`
  margin: 24px 0;
`;
const Button = styled.button`
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
`;
const MentorCard1 = () => {
  return <div>Hello</div>;
};

export default MentorCard1;
