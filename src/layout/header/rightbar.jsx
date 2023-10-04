import React, { Fragment, useEffect, useState } from 'react';
import {
  Bell,
  FileText,
  LogIn,
  Mail,
  MessageSquare,
  Minimize,
  Search,
  User,
} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setDefaultLanguage,
  setLanguage,
  setLanguageCookie,
  setTranslations,
  translate,
} from 'react-switch-lang';

import ae from '../../assets/i18n/ae.json';
import cn from '../../assets/i18n/cn.json';
import du from '../../assets/i18n/du.json';
import en from '../../assets/i18n/en.json';
import es from '../../assets/i18n/es.json';
import fr from '../../assets/i18n/fr.json';
import pt from '../../assets/i18n/pt.json';
import man from '../../assets/images/dashboard/profile.jpg';
import {
  Account,
  AinChavez,
  CheckAllNotification,
  DeliveryComplete,
  DeliveryProcessing,
  English,
  EricaHughes,
  Inbox,
  KoriThomas,
  LogOut,
  MessageBox,
  Nepali,
  Notification,
  OrderComplete,
  Taskboard,
  TicketsGenerated,
  ViewAll,
} from '../../constant';
import Bookmark from '../../layout/bookmark';
import Authaction from '../../pages/authentication/redux/actions';
import { APP_CONFIG } from 'app/config';
import axios from 'axios';

setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage('en');
setLanguageCookie();

const Rightbar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState('');
  const [searchresponsive, setSearchresponsive] = useState(false);
  const [langdropdown] = useState(false);
  const [moonlight, setMoonlight] = useState(false);
  const [setSelected] = useState('en');

  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [chatDropDown, setChatDropDown] = useState(false);

  const authenticated = JSON.parse(localStorage.getItem('authenticated'));
  const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));
  const [notificationCount, setNotificationCount] = useState(0);

  const handleSetLanguage = (key) => {
    setLanguage(key);
    setSelected(key);
  };

  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || man);
    if (localStorage.getItem('layout_version') === 'dark-only') {
      setMoonlight(true);
    }
  }, []);

  // Display Notification Count
  useEffect(() => {
    axios
      .get(`${APP_CONFIG.API_BASE_URL}/push-notifications/count`)
      .then((data) => {
        setNotificationCount(data.data.count);
      });
  }, []);

  const handleLogout = () => {
    dispatch(Authaction.logout());
  };
  const RedirectToChats = () => {
    history.push(`/app/chat-app`);
  };

  const RedirectToNotification = () => {
    history.push('/app/notification-list');
  };

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT,
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive);
      document.querySelector('.search-full').classList.add('open');
      document.querySelector('.more_lang').classList.remove('active');
    } else {
      setSearchresponsive(!searchresponsive);
      document.querySelector('.search-full').classList.remove('open');
    }
  };

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.className = 'light';
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light);
      document.body.className = 'dark-only';
      localStorage.setItem('layout_version', 'dark-only');
    }
  };

  const currentUser = useSelector((state) => state.Auth.currentUser);
  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="language-nav">
            <div
              className={`translate_wrapper ${langdropdown ? 'active' : ''}`}
            >
              <div className="current_lang"></div>
              <div className={`more_lang ${langdropdown ? 'active' : ''}`}>
                <div className="lang" onClick={() => handleSetLanguage('en')}>
                  <i className="flag-icon flag-icon-us"></i>
                  <span className="lang-txt">
                    {English}
                    <span> {'(US)'}</span>
                  </span>
                </div>
                <div className="lang" onClick={() => handleSetLanguage('du')}>
                  <i className="flag-icon flag-icon-np"></i>
                  <span className="lang-txt">{Nepali}</span>
                </div>
              </div>
            </div>
          </li>
          {/* <li>
            <span className="header-search">
              <Search onClick={() => SeacrhResposive(searchresponsive)} />
            </span>
          </li> */}
          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              {/* Notification Count  */}
              <span className="badge badge-pill badge-secondary">
                {notificationCount ? notificationCount : 0}
              </span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? 'active' : ''
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-primary"> </i>
                  {DeliveryProcessing}{' '}
                  <span className="pull-right">{'10 min.'}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-success"></i>
                  {OrderComplete}
                  <span className="pull-right">{'1 hr'}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-info"></i>
                  {TicketsGenerated}
                  <span className="pull-right">{'3 hr'}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-danger"></i>
                  {DeliveryComplete}
                  <span className="pull-right">{'6 hr'}</span>
                </p>
              </li>
              <li>
                <button
                  className="btn btn-primary"
                  onClick={RedirectToNotification}
                >
                  {CheckAllNotification}
                </button>
              </li>
            </ul>
          </li>
          {/* <Bookmark /> */}
          {/* //! @zero: TODO: no proper dark theme implementation */}
          {/* <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
              <i
                className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}
              ></i>
            </div>
          </li> */}
          {/* chat box */}
          {/* <li
            className="onhover-dropdown"
            onClick={() => setChatDropDown(!chatDropDown)}
          >
            <MessageSquare />
            <ul
              className={`chat-dropdown onhover-show-div ${
                chatDropDown ? 'active' : ''
              }`}
            >
              <li>
                <MessageSquare />
                <h6 className="f-18 mb-0">{MessageBox}</h6>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media">
                  <img
                    className="img-fluid rounded-circle mr-3"
                    src={require('../../assets/images/user/1.jpg')}
                    alt=""
                  />
                  <div className="status-circle online"></div>
                  <div className="media-body">
                    <span>{EricaHughes}</span>
                    <p>{'Lorem Ipsum is simply dummy...'}</p>
                  </div>
                  <p className="f-12 font-success">{'58 mins ago'}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media">
                  <img
                    className="img-fluid rounded-circle mr-3"
                    src={require('../../assets/images/user/2.jpg')}
                    alt=""
                  />
                  <div className="status-circle online"></div>
                  <div className="media-body">
                    <span>{KoriThomas}</span>
                    <p>{'Lorem Ipsum is simply dummy...'}</p>
                  </div>
                  <p className="f-12 font-success">{'1 hr ago'}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media">
                  <img
                    className="img-fluid rounded-circle mr-3"
                    src={require('../../assets/images/user/4.jpg')}
                    alt=""
                  />
                  <div className="status-circle offline"></div>
                  <div className="media-body">
                    <span>{AinChavez}</span>
                    <p>{'Lorem Ipsum is simply dummy...'}</p>
                  </div>
                  <p className="f-12 font-danger">{'32 mins ago'}</p>
                </div>
              </li>
              <li className="text-center">
                {' '}
                <button className="btn btn-primary" onClick={RedirectToChats}>{ViewAll} </button>
              </li>
            </ul>
          </li> */}
          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Minimize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img
                className="b-r-10"
                src={authenticated ? auth0_profile.picture : profile}
                alt=""
              />
              <div className="media-body">
                <p className="mb-0 mt-2 font-roboto">
                  {currentUser?.username}
                  <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => UserMenuRedirect('/dashboard/userprofile')}>
                <User />
                <span>{Account} </span>
              </li>
              {/* <li onClick={() => UserMenuRedirect(`/app/email-app`)}>
                <Mail />
                <span>{Inbox}</span>
              </li> */}
              {/* <li onClick={() => UserMenuRedirect(`/app/todo-app/todo`)}>
                <FileText />
                <span>{Taskboard}</span>
              </li> */}
              <li onClick={handleLogout}>
                <LogIn />
                <span>{LogOut}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default translate(Rightbar);
