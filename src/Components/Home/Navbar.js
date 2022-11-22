import React, { useState } from "react";
import LoginIcon from "../../images/login-icon.png";
import userIcon from "../../images/user-icon.png";
import logo from "../../images/Practiwiz-logo.png";
import hoverImage from "../../images/mamu-img1.jpg";

const Navbar = () => {
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [aboutMenu, setAboutMenu] = useState(false);
  const [addBackGroundBackdrop, setAddBackGroundBackdrop] = useState("none");
  const [showMenuBarItems, setShowMenuBarItems] = useState(false);
  const [showItTrainingMenu, setShowItTrainingMenu] = useState(false);
  const [showBtTrainingMenu, setShowBtTrainingMenu] = useState(false);

  return (
    <>
      <header className="fixed">
        <div className="top-bar">
          <div className="center">
            <div className="top-left">
              <a href="link">+91 9830259960</a>
              <a>|</a>
              <a href="link">info@practiwiz.com</a>
            </div>

            <div className="top-right">
              <a href="link">Store</a>
              <a>|</a>
              <a href="link">Chill Zone</a>
              <a href="link">
                <img src={LoginIcon} alt="link" /> Login
              </a>
              <a href="link">
                <img src={userIcon} alt="link" /> Register
              </a>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="headSec2">
            <a href="/" className="logo">
              <img src={logo} title="Practiwiz" alt="Practiwiz" />
            </a>
            <span
              className={
                showMenuBarItems ? "mobNavTriger mtClose" : "mobNavTriger"
              }
              onClick={() => {
                return (
                  setShowMenuBarItems(!showMenuBarItems),
                  setAddBackGroundBackdrop("none")
                );
              }}
            ></span>
            <aside className="headSec2_right">
              <nav
                className={showMenuBarItems ? "navHolder active" : "navHolder"}
              >
                <ul className="nav">
                  <li className="hasMegamenu dropdown_mob">
                    <a
                      onMouseEnter={() => {
                        return (
                          setShowItTrainingMenu(true),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("block")
                        );
                      }}
                      href="link"
                    >
                      IT Training
                    </a>
                    <div
                      onMouseLeave={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("none")
                        );
                      }}
                      className={
                        showItTrainingMenu === true
                          ? "submenuHolder megamenu active"
                          : "submenuHolder megamenu"
                      }
                    >
                      {showItTrainingMenu === true && (
                        <>
                          <aside>
                            <ul>
                              <li>
                                <a href="link">Data Analytics Fundamentals</a>
                              </li>
                              <li>
                                <a href="link">AWS Compute Services Overview</a>
                              </li>
                              <li>
                                <a href="link">
                                  Cloud Essentials Learning Plan
                                </a>
                              </li>
                              <li>
                                <a href="link">Developer Learning Plan</a>
                              </li>
                            </ul>
                          </aside>
                          <aside>
                            <ul>
                              <li>
                                <a href="asdga">Networking Learning Plan</a>
                              </li>
                              <li>
                                <a href="asdga">Data Analytics Learning Plan</a>
                              </li>
                              <li>
                                <a href="link">
                                  AWS Cloud Practitioner Essentials
                                </a>
                              </li>
                            </ul>
                          </aside>
                          <figure>
                            <img src={hoverImage} alt=";" />
                          </figure>
                        </>
                      )}
                    </div>
                  </li>
                  <li
                    className="hasMegamenu dropdown_mob"
                    onMouseEnter={() => {
                      return (
                        setShowItTrainingMenu(false),
                        setShowBtTrainingMenu(true),
                        setShowContactMenu(false),
                        setAboutMenu(false),
                        setAddBackGroundBackdrop("block")
                      );
                    }}
                  >
                    <a href="link">Business Training</a>
                    <div
                      onMouseLeave={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("none")
                        );
                      }}
                      className={
                        showBtTrainingMenu === true
                          ? "submenuHolder megamenu active"
                          : "submenuHolder megamenu"
                      }
                    >
                      {showBtTrainingMenu === true && (
                        <>
                          <aside>
                            <ul>
                              <li>
                                <a href="link">Data Analytics Fundamentals</a>
                              </li>
                              <li>
                                <a href="link">AWS Compute Services Overview</a>
                              </li>
                              <li>
                                <a href="link">
                                  Cloud Essentials Learning Plan
                                </a>
                              </li>
                              <li>
                                <a href="link">Developer Learning Plan</a>
                              </li>
                            </ul>
                          </aside>
                          <aside>
                            <ul>
                              <li>
                                <a href="asdga">Networking Learning Plan</a>
                              </li>
                              <li>
                                <a href="asdga">Data Analytics Learning Plan</a>
                              </li>
                              <li>
                                <a href="link">
                                  AWS Cloud Practitioner Essentials
                                </a>
                              </li>
                            </ul>
                          </aside>
                          <figure>
                            <img src={hoverImage} alt=";" />
                          </figure>
                        </>
                      )}
                    </div>
                  </li>
                  <li className="hasMegamenu">
                    <a href="link">Methodology</a>
                  </li>
                  <li className="hasMegamenu">
                    <a href="link">Mentor Club</a>
                  </li>
                  <li className="hasMegamenu">
                    <a href="link">Jobs</a>
                  </li>
                  <li className="hasMegamenu dropdown_mob">
                    <a
                      href="link"
                      onMouseEnter={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(true),
                          setAddBackGroundBackdrop("block")
                        );
                      }}
                    >
                      About Us
                    </a>
                    <div
                      onMouseLeave={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("none")
                        );
                      }}
                      className={
                        aboutMenu === true
                          ? "submenuHolder megamenu active"
                          : "submenuHolder megamenu"
                      }
                    >
                      {aboutMenu === true && (
                        <>
                          <aside>
                            <ul>
                              <li>
                                <a href="overview.html">Overview</a>
                              </li>
                              <li>
                                <a href="asdga">Vision Mission Values</a>
                              </li>
                              <li>
                                <a href="asdga">Milestones</a>
                              </li>
                            </ul>
                          </aside>
                          <aside>
                            <ul>
                              <li>
                                <a href="link">Leadership</a>
                              </li>
                              <li>
                                <a href="asdga">CMS Message</a>
                              </li>
                              <li>
                                <a href="link">Social Initiatives</a>
                              </li>
                            </ul>
                          </aside>
                          <figure>
                            <img src={hoverImage} alt=";" />
                          </figure>
                        </>
                      )}
                    </div>
                  </li>
                  <li className="hasMegamenu dropdown_mob">
                    <a
                      href="link"
                      onMouseEnter={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(true),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("block")
                        );
                      }}
                    >
                      Contact Us
                    </a>
                    <div
                      onMouseLeave={() => {
                        return (
                          setShowItTrainingMenu(false),
                          setShowBtTrainingMenu(false),
                          setShowContactMenu(false),
                          setAboutMenu(false),
                          setAddBackGroundBackdrop("none")
                        );
                      }}
                      className={
                        showContactMenu === true
                          ? "submenuHolder megamenu active"
                          : "submenuHolder megamenu"
                      }
                    >
                      {showContactMenu === true && (
                        <>
                          <aside>
                            <ul>
                              <li>
                                <a href="asdga">Address/ Location</a>
                              </li>
                            </ul>
                          </aside>
                          <aside>
                            <ul>
                              <li>
                                <a href="asdga">Query</a>
                              </li>
                            </ul>
                          </aside>
                          <figure>
                            <img src={hoverImage} alt=";" />
                          </figure>
                        </>
                      )}
                    </div>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </header>
      <div
        className="submenu_bg"
        style={{ display: addBackGroundBackdrop }}
      ></div>
    </>
  );
};

export default Navbar;