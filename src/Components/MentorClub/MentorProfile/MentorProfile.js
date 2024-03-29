import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import Form1 from "../../Forms/ProfileForm/Form1.js";
import Form2 from "../../Forms/ProfileForm/Form2.js";
import Form3 from "../../Forms/ProfileForm/Form3.js";
import Form4 from "../../Forms/ProfileForm/Form4.js";
import ImageForm from "../../Forms/ProfileForm/ImageForm.js";
import GoToTop from "../../GoToTop.js";
import {
  ApprovedDiv,
  DetailsFlex,
  DetailsFlex1,
  DetailsFromDb,
  DetailsTitles,
  DetailsWrapper,
  Div,
  FillDiv,
  FillDivProgress,
  Img,
  ImgBox,
  LeftDiv,
  MentorRegButton,
  NotFoundDiv,
  NotFoundTitle,
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  SocialButton,
  TraineeRole,
  TraineeTitle,
  Wrapper,
  Wrapper1,
} from "./MentorBookingProfileElements.js";
import { Link } from "react-router-dom";
import MentorBankDetails from "./MentorBankAccountDetails";
import { ModelFixedHeight, ScrollModel } from "../../utils/Model.js";
const TraineeProfile = () => {
  const [accountForm, setAccountForm] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [deleteAccountForm, setDeleteAccountForm] = useState(false);
  const [changeImageForm, setChangeImageForm] = useState(false);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [showBankAccountForm, setShowBankAccountForm] = useState(false);
  const [mentorPoints, setMentorPoints] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  const showAccountForm = () => {
    setAccountForm(!accountForm);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showPasswordForm = () => {
    setChangePasswordForm(!changePasswordForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showDeleteAccount = () => {
    setAccountForm(false);
    setDeleteAccountForm(!deleteAccountForm);
    setChangePasswordForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showImageForm = () => {
    setChangeImageForm(!changeImageForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setShowBankAccountForm(false);
  };
  const showBankAccountFormHandler = () => {
    setShowBankAccountForm(!showBankAccountForm);
    setChangeImageForm(false);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
  };
  const token = user?.accessToken;

  useEffect(() => {
    const getFullMentorDetails = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/mentor/get/full-details/${user?.email}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setMentorDetails(res.data.success);
    };
    getFullMentorDetails();
  }, [user?.email, token]);

  useEffect(() => {
    const getMentorPointsDetails = async () => {
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
    getMentorPointsDetails();
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
                      to={`/mentor/profile/my-sessions`}
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
                          <span style={{ color: "gold" }}>
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
                <SidebarListItem onClick={showBankAccountFormHandler}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-money-check-dollar"></i>
                    </span>
                    Add Bank account
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
          {showBankAccountForm ? (
            <ScrollModel closeScrollModelHandler={showBankAccountFormHandler}>
              <MentorBankDetails />
            </ScrollModel>
          ) : (
            ""
          )}
          <LeftDiv>
            <Wrapper1>
              <DetailsWrapper>
                {mentorDetails?.length === 0 && (
                  <>
                    <NotFoundDiv>
                      <i className="fa-solid fa-circle-info"></i>
                      <p>
                        You have not completed your mentor application. It’s
                        important that you fill out the application in its
                        entirety to be considered for a mentor position.
                      </p>
                    </NotFoundDiv>
                    <FillDiv>
                      <FillDivProgress>20%</FillDivProgress>
                    </FillDiv>
                    <MentorRegButton>
                      <Link
                        style={{ textDecoration: "none", color: "#fff" }}
                        to={"/mentor/additional-details"}
                      >
                        Apply now
                      </Link>
                    </MentorRegButton>
                  </>
                )}
                {mentorDetails?.map((mentor) => (
                  <div key={mentor.trainee_id}>
                    {mentor.mentor_approved === "Yes" ? (
                      " "
                    ) : (
                      <ApprovedDiv success>
                        <i className="fa-solid fa-circle-info"></i>
                        <p>
                          Thank you for applying to become a mentor at our
                          organization. We are taking the time to carefully
                          review your application and consider your
                          qualifications and experience.we will look at how
                          invested you are in helping others reach their goals.
                          We look forward to learning more about you and what
                          makes you a great choice for this position!
                        </p>
                      </ApprovedDiv>
                    )}
                    <ImgBox>
                      <div>
                        <TraineeTitle>
                          {user.firstname + " " + user.lastname}
                        </TraineeTitle>
                        <TraineeRole>
                          <b>Role : </b> {user.type} <br />
                          <b>Status : </b>
                          {mentor.mentor_approved === "Yes"
                            ? "Application approved"
                            : "Application not approved"}
                        </TraineeRole>
                        <br />
                        <div style={{ marginTop: "20px" }}>
                          <SocialButton
                            target="_blank"
                            href="https://google.com/"
                          >
                            website
                          </SocialButton>
                          <SocialButton>
                            <a
                              rel="noreferrer noopener"
                              target="_blank"
                              href={`${mentor.mentor_linkedin_profile}`}
                            >
                              linked in
                            </a>
                          </SocialButton>
                        </div>
                      </div>
                      <Img src={mentor.mentor_image} />
                    </ImgBox>
                    <DetailsFlex>
                      <DetailsFlex1>
                        <DetailsTitles>Your Email : </DetailsTitles>
                        <DetailsFromDb>{mentor.mentor_email}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your Mobile : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_phone_number}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Skills category : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_speciality}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Skills : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_skills} {mentor.mentor_otherSkills}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your mentorship timings :</DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_availability_start_time} to
                          {" " + mentor.mentor_availability_end_time}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Experience : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_experience} Year's
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Current Role: </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_current_role}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Current Company: </DetailsTitles>
                        <DetailsFromDb>{mentor.mentor_firm}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>
                          Mentor Sessions Conducted:
                        </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_sessions_conducted}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Mentor Sessions Missed :</DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_unattended_sessions}
                        </DetailsFromDb>
                      </DetailsFlex1>
                    </DetailsFlex>
                  </div>
                ))}
              </DetailsWrapper>
            </Wrapper1>
          </LeftDiv>
        </Div>
        <GoToTop />
      </Section>
    </>
  );
};

export default TraineeProfile;
