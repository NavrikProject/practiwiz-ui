import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import Form1 from "../Forms/ProfileForm/Form1.js";
import Form2 from "../../Forms/ProfileForm/Form2.js";
import Form3 from "../../Forms/ProfileForm/Form3.js";
import Form4 from "../../Forms/ProfileForm/Form4.js";
import ImageForm from "../../Forms/ProfileForm/ImageForm.js";
import GoToTop from "../../GoToTop.js";
import {
  DetailsFlex,
  DetailsFlex1,
  DetailsFromDb,
  DetailsTitles,
  DetailsWrapper,
  Div,
  Img,
  ImgBox,
  LeftDiv,
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  TraineeRole,
  TraineeTitle,
  Wrapper,
} from "./TraineeProfileElements.js";
import SingleProfile from "../../Forms/ProfileForm/SingleProfile";
import { Link } from "react-router-dom";
import { ModelFixedHeight, ScrollModel } from "../../utils/Model";
const TraineeProfile = () => {
  const [personalForm, setPersonalForm] = useState(false);
  const [accountForm, setAccountForm] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [deleteAccountForm, setDeleteAccountForm] = useState(false);
  const [changeImageForm, setChangeImageForm] = useState(false);
  const [traineeDetails, setTraineeDetails] = useState([]);
  const [mentorPoints, setMentorPoints] = useState([]);

  const user = useSelector((state) => state.user?.currentUser);

  const showPersonalForm = () => {
    setPersonalForm(!personalForm);
    setAccountForm(false);
    setChangePasswordForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
  };
  const showAccountForm = () => {
    setAccountForm(!accountForm);
    setPersonalForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
  };
  const showPasswordForm = () => {
    setChangePasswordForm(!changePasswordForm);
    setPersonalForm(false);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
  };
  const showDeleteAccount = () => {
    setAccountForm(false);
    setDeleteAccountForm(!deleteAccountForm);
    setPersonalForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
  };
  const showImageForm = () => {
    setChangeImageForm(!changeImageForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setPersonalForm(false);
    setChangePasswordForm(false);
  };

  const token = user?.accessToken;

  useEffect(() => {
    const onImageGetHandler = async () => {
      const res = await axios.post(
        `http://localhost:1337/api/member/profile/details/get/${user?.id}`,
        { email: user?.email },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (res.data.success) {
        setTraineeDetails(res.data.success);
      } else {
        setTraineeDetails([]);
      }
    };
    onImageGetHandler();
  }, [user?.id, token, user?.email]);

  useEffect(() => {
    const getTraineePointsDetails = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/feedback/reward-points/${user?.email}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (res.data.success) {
        setMentorPoints(res.data.success);
      }
      if (res.data.notFound) {
        setMentorPoints([]);
      }
    };
    getTraineePointsDetails();
  }, [user?.email, token]);
  return (
    <>
      <Section>
        <Div>
          <RightDiv>
            <Wrapper>
              <h1>Quick Menu</h1>
              <SidebarListUl>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
                      to={`/member/profile/my-sessions`}
                    >
                      <span>
                        <i className="fa-solid fa-calendar-check"></i>
                      </span>
                      My Sessions
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
                      to={`/member/profile/my-courses`}
                    >
                      <span>
                        <i className="fa-solid fa-book"></i>
                      </span>
                      My Courses
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#111" }}
                      to={`/${user?.type}/profile/my-jobs`}
                    >
                      <span>
                        <i className="fa-regular fa-file"></i>
                      </span>
                      Applied Jobs
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showPersonalForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>
                    Personal Form
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showAccountForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>
                    Account
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-chart-line"></i>
                    </span>
                    Total Rewards :
                    {mentorPoints?.length > 0 ? (
                      mentorPoints?.map((mentorPoint) => (
                        <>
                          <span
                            style={{ color: "gold" }}
                            key={mentorPoint.user_points_dtls_id}
                          >
                            {" " + mentorPoint.user_points_dtls_closing_points}
                          </span>
                        </>
                      ))
                    ) : (
                      <span style={{ color: "gold" }}>0</span>
                    )}
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showPasswordForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-key"></i>
                    </span>
                    Password
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showImageForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-image"></i>
                    </span>
                    Change Profile picture
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showDeleteAccount}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                    Delete the account
                  </QuickMenuTitle>
                </SidebarListItem>
              </SidebarListUl>
            </Wrapper>
          </RightDiv>
          {personalForm ? (
            <ScrollModel closeScrollModelHandler={showPersonalForm}>
              <SingleProfile />
            </ScrollModel>
          ) : (
            ""
          )}
          {accountForm ? (
            <ModelFixedHeight closeModelHandler={showAccountForm}>
              <Form2 />
            </ModelFixedHeight>
          ) : (
            ""
          )}
          {changePasswordForm ? (
            <ModelFixedHeight closeModelHandler={showPasswordForm}>
              <Form3 />
            </ModelFixedHeight>
          ) : (
            ""
          )}
          {deleteAccountForm ? (
            <ModelFixedHeight closeModelHandler={showDeleteAccount}>
              <Form4 />
            </ModelFixedHeight>
          ) : (
            ""
          )}
          {changeImageForm ? (
            <ModelFixedHeight closeModelHandler={showImageForm}>
              <ImageForm />
            </ModelFixedHeight>
          ) : (
            ""
          )}
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {traineeDetails?.length === 0 && (
                  <h1>Please fill the Personal details.</h1>
                )}
                {traineeDetails.length > 0 &&
                  traineeDetails?.map((trainee) => (
                    <div key={trainee.trainee_id}>
                      <ImgBox>
                        <div>
                          <TraineeTitle>
                            {user.firstname + " " + user.lastname}
                          </TraineeTitle>
                          <TraineeRole>
                            <b>Role : </b> {user.type}
                          </TraineeRole>
                        </div>
                        <Img src={trainee.trainee_image} />
                      </ImgBox>
                      <DetailsFlex>
                        <DetailsFlex1>
                          <DetailsTitles>Your Email : </DetailsTitles>
                          <DetailsFromDb>{trainee.trainee_email}</DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>Your Mobile : </DetailsTitles>
                          <DetailsFromDb>
                            {trainee.trainee_mobile}
                          </DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>Date Of Birth : </DetailsTitles>
                          <DetailsFromDb>
                            {new Date(trainee.trainee_dob).toLocaleDateString()}
                          </DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>Experience : </DetailsTitles>
                          <DetailsFromDb>
                            {trainee.trainee_experience} Year's
                          </DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>Education : </DetailsTitles>
                          <DetailsFromDb>
                            {trainee.trainee_profession}
                          </DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>Address : </DetailsTitles>
                          <DetailsFromDb>
                            {trainee.trainee_address}
                          </DetailsFromDb>
                        </DetailsFlex1>
                        <DetailsFlex1>
                          <DetailsTitles>
                            Your unattended sessions :
                          </DetailsTitles>
                          <DetailsFromDb>
                            <b>{trainee.trainee_unattended_sessions + " "}</b>
                            sessions
                          </DetailsFromDb>
                        </DetailsFlex1>
                      </DetailsFlex>
                    </div>
                  ))}
              </DetailsWrapper>
            </Wrapper>
          </LeftDiv>
        </Div>
        <GoToTop />
      </Section>
    </>
  );
};

export default TraineeProfile;
