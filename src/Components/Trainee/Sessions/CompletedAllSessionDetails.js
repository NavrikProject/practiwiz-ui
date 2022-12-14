import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const UpcomingAllDivContent = styled.p`
  font-size: 20px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
    text-transform: uppercase;
  }
  @media screen and (max-width: 780px) {
    font-size: 16px;
  }
`;
const JoinButtonDiv = styled.div`
  padding: 20px 0;
`;
const RebookAppointment = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df !important;
  color: #fff !important;
  border-radius: 5px;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;

const CompletedAllSessionDetails = (props) => {
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have successfully completed a mentorship session with
          <span>{" " + props.mentor.mentorFullName + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + ". "}</span> If you have any query,
          get back to us through support email!
        </UpcomingAllDivContent>
        <JoinButtonDiv>
          <div>
            <RebookAppointment>
              <Link
                style={{ textDecoration: "none", color: " #fff" }}
                to={`/mentors-club
                `}
              >
                Book Again
              </Link>
            </RebookAppointment>
          </div>
        </JoinButtonDiv>
      </div>
    </div>
  );
};

export default CompletedAllSessionDetails;
