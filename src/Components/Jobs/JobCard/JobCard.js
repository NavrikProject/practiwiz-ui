import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ApplyNowButton,
  JobCardDescription,
  JobCardDisplayFlexDiv,
  JobCardDiv,
  JobCardSection,
  JobTitle,
  ViewJobButton,
} from "./JobCardElements";
import axios from "axios";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import LoginModel from "../../Forms/AccountForms/LoginModel";
import { ModelFixedHeight } from "../../utils/Model";
import ApplyJobForm from "./ApplyJobForm";
import JobCardSkelton from "../../SkeltonLoaders/JobCardSkelton";
const JobCard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [allJobs, setAllJobs] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showApplyJobForm, setApplyJobForm] = useState(false);
  const [indJobDetails, setIndJobDetails] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllJobPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://deploy-practiwiz.azurewebsites.net/api/jobs/get/all-jobs-posts"
      );
      if (res.data.success) {
        setAllJobs(res.data.success);
        setLoading(false);
      }
      if (res.data.error) {
        setAllJobs([]);
        setLoading(false);
      }
    };
    getAllJobPosts();
  }, []);
  const showApplyJobModalHandler = (job) => {
    setShowLoginModal(false);
    setApplyJobForm(!showApplyJobForm);
    setIndJobDetails(job);
  };
  const showLoginModelHandler = () => {
    setShowLoginModal(!showLoginModal);
    setApplyJobForm(false);
  };
  return (
    <>
      {showLoginModal && (
        <ModelFixedHeight closeModelHandler={showLoginModelHandler}>
          <LoginModel />
        </ModelFixedHeight>
      )}
      {showApplyJobForm && (
        <ApplyJobForm
          showApplyJobModalHandler={showApplyJobModalHandler}
          indJobDetails={indJobDetails}
        />
      )}
      {loading ? (
        <>
          <JobCardSkelton /> <JobCardSkelton />
          <JobCardSkelton /> <JobCardSkelton />
          <JobCardSkelton />
          <JobCardSkelton /> <JobCardSkelton />
          <JobCardSkelton />
        </>
      ) : allJobs?.length > 0 ? (
        allJobs?.slice(0, 5).map((job) => (
          <div key={job.job_post_dtls_id}>
            <article className="latest wow fadeInDown" data-wow-duration="0.4s">
              <div className="job-list-left">
                <img src={job.hiring_company_image} alt="" />
              </div>
              <div className="job-list-center">
                <p>
                  <strong>{" " + job.hiring_company_name} - </strong>
                  {"Looking for a "}
                  {" " + job.job_post_role.split("-").join(" ")} at
                  {" " + job.hiring_company_city},{" "}
                  {" " + job.hiring_company_state}. Salary{" "}
                  {" " + job.job_post_expected_salary + " "} Per Annum
                </p>
                <p>
                  <b>Key Skills</b> :{" " + job.job_post_req_skills + " "}
                  <b>Experience</b> : {" " + job.job_post_min_exp} Years
                </p>
                <ul>
                  <li>
                    Location -{" "}
                    {" " +
                      job.hiring_company_city +
                      "," +
                      job.hiring_company_state}
                  </li>
                  <li>{new Date(job.job_post_cr_dt).toDateString()}</li>
                  <li>{job.job_post_min_qual} required</li>
                  <li>{" " + job.job_post_job_type}</li>
                </ul>
              </div>
              <div className="job-list-right">
                <a href={`/jobs/individual-job/${job.job_post_unique_id}`}>
                  Apply Now
                </a>
              </div>
            </article>
          </div>
        ))
      ) : (
        <p>No job found</p>
      )}
    </>
  );
};

export default JobCard;
