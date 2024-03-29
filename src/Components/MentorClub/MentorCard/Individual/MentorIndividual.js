import axios from "axios";
// swiper core styles
import "swiper/swiper.min.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import {
  BookNowButton,
  MentorBioDesc,
  MentorBoxDiv,
  MentorCoverDiv,
  MentorDesignation,
  MentorDetailsDiv,
  MentorDetailsDivFlex,
  MentorDetailsImgDiv,
  MentorDetailsName,
  MentorIndSection,
  MentorLanguages,
  MentorLanguagesDiv,
  MentorMsgButton,
  MentorMsgDiv,
  MentorMsgShareDiv,
  MentorName,
  MentorProfileAvailDiv,
  MentorProfileDateDiv,
  MentorProfileDiv,
  MentorProfileDivFlex,
  MentorProfileDivLeft,
  MentorProfileDivRight,
  MentorProfileImg,
  MentorRatingDiv,
  MentorRatingDivSlider,
  MentorRatingTitles,
  MentorRatingWrapper,
  MentorSectionDiv,
  MentorShareFlexDiv,
  MentorTimeSlotDiv,
  RatingContent,
  RatingContentDiv,
  RatingContentStarDiv,
  RatingContentText,
  RatingContentTraineeName,
  RatingImg,
} from "./MentorIndividualElements";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "../MentorCardDate.css";
import DatePicker from "react-datepicker";
import ConfirmModel from "./ConfirmModel";
import GoToTop from "../../../GoToTop";
import { useSelector } from "react-redux";
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";
// import LoginModel from "../../Forms/LoginModel";
import Carousel from "react-elastic-carousel";
import { ModelFixedHeight } from "../../../utils/Model";
import LoginModel from "../../../Forms/AccountForms/LoginModel";
const MentorIndividual = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[3];
  const [indMentor, setIndMentor] = useState([]);
  const [date, setDate] = useState();
  const [mentorBookingDate, setMentorBookingDate] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sendMentor, setSendMentor] = useState();
  const [mentorFeedback, setMentorFeedback] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [shareProfile, setShareProfile] = useState(false);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 3, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  useEffect(() => {
    document.title = `Practiwiz | ${path
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`;
    try {
      const getIndMentorDetails = async () => {
        const res = await axios.get(
          `http://localhost:1337/api/mentor/get/individual/mentors?name=${path}`
        );
        setIndMentor(res.data);
      };
      getIndMentorDetails();
    } catch (error) {
      return;
    }
  }, [path]);

  useEffect(() => {
    try {
      const getIndMentorFeedback = async () => {
        const res = await axios.get(
          `http://localhost:1337/api/feedback/get/mentor-feedback/mentors?name=${path}`
        );
        setMentorFeedback(res.data.data);
      };
      getIndMentorFeedback();
    } catch (error) {
      return;
    }
  }, [path]);
  useEffect(() => {
    try {
      const getAllMentorDetailsAvailability = async () => {
        const res = await axios.get(
          `http://localhost:1337/api/mentor/get/booking`
        );
        setMentorBookingDate(res.data);
      };
      getAllMentorDetailsAvailability();
    } catch (error) {
      return;
    }
  }, []);
  const setTimeSlotActive = (e) => {
    setIsActive(!isActive);
  };
  // disable the list of custom dates
  function isWorkDay(available, date) {
    const weekDay = new Date(date).getDay();
    if (available === "weekends") {
      return (
        weekDay !== 1 &&
        weekDay !== 2 &&
        weekDay !== 3 &&
        weekDay !== 4 &&
        weekDay !== 5
      );
    } else if (available === "weekdays") {
      return weekDay !== 0 && weekDay !== 6;
    } else if (available === "saturday") {
      return weekDay === 6;
    } else if (available === "sunday") {
      return weekDay === 0;
    }
  }

  const getDate = (date, mentor) => {
    for (let i = 0; i < mentorBookingDate.length; i++) {
      const element = mentorBookingDate[i].mentorId;
      if (
        element === mentor.mentor_dtls_id &&
        new Date(date).toLocaleDateString() === mentorBookingDate[i].bookedDate
      ) {
        return "disabled-date";
      }
    }
  };
  const showModalHandler = (mentor) => {
    console.log(mentor, date);
    if (
      new Date().toLocaleDateString() === new Date(date).toLocaleDateString()
    ) {
      return toast.error("Today's can not be selected", {
        position: "top-center",
      });
    }
    if (!date) {
      return toast.error("Please choose select date", {
        position: "top-center",
      });
    }
    setShowModal(!showModal);
    setSendMentor(mentor);
  };
  const user = useSelector((state) => state.user.currentUser);
  const showLoginModelHandler = () => {
    setShowLoginModal(!showLoginModal);
  };
  const shareProfileHandler = () => {
    setShareProfile(!shareProfile);
  };
  return (
    <MentorIndSection>
      {showModal && (
        <ConfirmModel
          showModalHandler={showModalHandler}
          sendMentor={sendMentor}
          date={date}
        />
      )}
      {showLoginModal && (
        <ModelFixedHeight closeModelHandler={showLoginModelHandler}>
          <LoginModel showLoginModelHandler={showLoginModelHandler} />
        </ModelFixedHeight>
      )}
      <MentorCoverDiv></MentorCoverDiv>
      {indMentor?.map((mentor) => (
        <div key={mentor.mentor_dtls_id}>
          <MentorSectionDiv>
            <MentorDetailsDiv>
              <MentorDetailsDivFlex>
                <MentorDetailsName>
                  <MentorName>
                    {mentor.mentor_firstname +
                      " " +
                      mentor.mentor_lastname +
                      " " +
                      " "}
                  </MentorName>
                  <MentorDesignation>
                    {" " + mentor.mentor_current_role + " "}
                  </MentorDesignation>{" "}
                  {/* at{" "}
                <MentorDesignation>
                  {" " + mentor.mentor_firm}
                </MentorDesignation> */}
                  <br />
                  <MentorMsgDiv>
                    <MentorMsgButton>
                      Message <i className="fa-solid fa-message"></i>
                    </MentorMsgButton>
                    <MentorMsgButton onClick={shareProfileHandler}>
                      Share Profile <i className="fa-solid fa-share-nodes"></i>
                    </MentorMsgButton>
                    {shareProfile && (
                      <MentorMsgShareDiv>
                        <div>
                          <div>
                            <MentorShareFlexDiv>
                              <FacebookShareButton
                                style={{ marginRight: "10px" }}
                                url={location.pathname}
                              >
                                Share on Facebook
                              </FacebookShareButton>
                              <FacebookIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                            <MentorShareFlexDiv>
                              <EmailShareButton url={location.pathname}>
                                Share on Email
                              </EmailShareButton>
                              <EmailIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                            <MentorShareFlexDiv>
                              <WhatsappShareButton url={location.pathname}>
                                Share on whatsapp
                              </WhatsappShareButton>
                              <WhatsappIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                            <MentorShareFlexDiv>
                              <LinkedinShareButton url={location.pathname}>
                                Share on Linkedin
                              </LinkedinShareButton>{" "}
                              <LinkedinIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                            <MentorShareFlexDiv>
                              <TelegramShareButton url={location.pathname}>
                                Share on Telegram
                              </TelegramShareButton>
                              <TelegramIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                            <MentorShareFlexDiv>
                              <TwitterShareButton url={location.pathname}>
                                Share on Twitter
                              </TwitterShareButton>
                              <TwitterIcon size={24} round={true} />
                            </MentorShareFlexDiv>
                          </div>
                        </div>
                      </MentorMsgShareDiv>
                    )}
                  </MentorMsgDiv>
                </MentorDetailsName>
                <MentorDetailsImgDiv>
                  <MentorProfileImg
                    src={mentor.mentor_image}
                    alt={
                      mentor.mentor_firstname +
                      " " +
                      mentor.mentor_lastname +
                      " " +
                      " "
                    }
                  />
                </MentorDetailsImgDiv>
              </MentorDetailsDivFlex>
            </MentorDetailsDiv>
            <MentorDetailsDiv>
              <h1>OverView</h1>
              <hr />
              <MentorProfileDiv>
                <MentorProfileDivFlex>
                  <MentorProfileDivLeft>
                    <MentorBioDesc>{mentor.mentor_bio}</MentorBioDesc>
                    <MentorLanguagesDiv>
                      <MentorLanguages>
                        Skills Known: <span>{mentor.mentor_skills}</span>
                      </MentorLanguages>
                    </MentorLanguagesDiv>
                    <MentorLanguagesDiv>
                      <MentorLanguages>
                        Expertise In:{" "}
                        <span>{mentor.mentor_mentorship_area}</span>
                      </MentorLanguages>
                    </MentorLanguagesDiv>
                    <MentorLanguagesDiv>
                      <MentorLanguages>
                        Languages Known: <span>English</span>
                      </MentorLanguages>
                    </MentorLanguagesDiv>
                  </MentorProfileDivLeft>
                  <MentorProfileDivRight>
                    <MentorProfileAvailDiv>
                      <h4>Available Sessions:</h4>
                      <hr />
                      <MentorProfileDateDiv>
                        Choose the Date: <br />
                        <DatePicker
                          value={moment(date).format("DD-MMMM-YYYY")}
                          required
                          className="form-control"
                          closeOnScroll={true}
                          selected={date}
                          onChange={(date) => setDate(date)}
                          minDate={new Date()}
                          maxDate={new Date(mentor.mentor_available_end_date)}
                          dayClassName={(date) => getDate(date, mentor)}
                          filterDate={(date) =>
                            isWorkDay(mentor.mentor_availability, date)
                          }
                        />
                        <MentorBoxDiv>
                          <div className="booked"></div>
                          <p>The red color shows those are not available</p>
                        </MentorBoxDiv>
                      </MentorProfileDateDiv>
                      <MentorProfileDateDiv>
                        Choose the Time slot: <br />
                        <MentorTimeSlotDiv
                          value={mentor.mentor_availability_slot_from}
                          isActive={isActive}
                          onClick={setTimeSlotActive}
                        >
                          <strong>
                            {mentor.mentor_availability_start_time + " "}
                          </strong>
                          to
                          <strong>
                            {" " + mentor.mentor_availability_end_time}
                          </strong>
                        </MentorTimeSlotDiv>
                      </MentorProfileDateDiv>
                      {!user ? (
                        <BookNowButton onClick={showLoginModelHandler}>
                          Login
                        </BookNowButton>
                      ) : (
                        <BookNowButton onClick={() => showModalHandler(mentor)}>
                          Book a session
                        </BookNowButton>
                      )}
                      <p>
                        Note : You will earn 10 points for each mentor booking.
                      </p>
                    </MentorProfileAvailDiv>
                  </MentorProfileDivRight>
                </MentorProfileDivFlex>
              </MentorProfileDiv>
            </MentorDetailsDiv>
          </MentorSectionDiv>
        </div>
      ))}
      <MentorRatingDiv>
        <MentorRatingWrapper>
          <MentorRatingTitles>Testimonials</MentorRatingTitles>
          {mentorFeedback?.length > 0 ? (
            mentorFeedback?.map((feedback) => (
              <MentorRatingDivSlider key={feedback.trainee_feedback_dtls_id}>
                <Carousel breakPoints={breakPoints}>
                  <RatingContentDiv>
                    <RatingContent>
                      <RatingImg
                        src={feedback.trainee_image}
                        alt="Trainee image"
                      />
                      <RatingContentText>
                        {feedback.trainee_feedback_aspects}
                      </RatingContentText>
                      <RatingContentStarDiv>
                        {feedback.trainee_feedback_overall_exp === "5" && (
                          <>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                          </>
                        )}
                        {feedback.trainee_feedback_overall_exp === "4" && (
                          <>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                          </>
                        )}
                        {feedback.trainee_feedback_overall_exp === "3" && (
                          <>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                            <i className="fa-solid fa-star gold"></i>
                          </>
                        )}
                      </RatingContentStarDiv>
                      <RatingContentTraineeName>
                        {feedback.trainee_fullname}
                      </RatingContentTraineeName>
                    </RatingContent>
                  </RatingContentDiv>
                </Carousel>
              </MentorRatingDivSlider>
            ))
          ) : (
            <MentorProfileAvailDiv>
              <MentorRatingDivSlider>
                No Testimonials found
              </MentorRatingDivSlider>
            </MentorProfileAvailDiv>
          )}
        </MentorRatingWrapper>
      </MentorRatingDiv>
      <GoToTop />
    </MentorIndSection>
  );
};

export default MentorIndividual;
