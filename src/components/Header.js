/* eslint-disable */
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setGuestLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    if (userName === "Guest") {
      history.push("/home");
    } else {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          console.log(user);
          history.push("/home");
        }
      });
    }
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err.message);
        });

      history.push("/home");
    } else if (userName === "guest") {
      dispatch(setSignOutState());
      history.push("/");
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuthGuest = () => {
    dispatch(setGuestLoginDetails());
    history.push("/home");
  };

  return (
    <Nav>
      <Logo>
        <a href="/home">
          <img src="./images/logo.svg" alt="disney+" />
        </a>
      </Logo>
      {!userName ? (
        <>
          <LoginMenu>
            <Login onClick={handleAuth}>Login</Login>
            <Login onClick={handleAuthGuest}>Guest</Login>
          </LoginMenu>
        </>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="./images/home-icon.svg" alt="home" />
              <span>HOME</span>
            </a>
            <a href="#">
              <img src="./images/search-icon.svg" alt="searcg" />
              <span>SEARCH</span>
            </a>
            <a href="#">
              <img src="./images/watchlist-icon.svg" alt="watchlist" />
              <span>WATCHLIST</span>
            </a>
            <a href="#">
              <img src="./images/original-icon.svg" alt="original" />
              <span>ORIGINAL</span>
            </a>
            <a href="#">
              <img src="./images/series-icon.svg" alt="series" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <DropDownItem>
                <img src="./images/home-icon.svg" alt="home" />
                <a href="/home">Home</a>
              </DropDownItem>
              <DropDownItem>
                <img src="./images/search-icon.svg" alt="home" />
                <a href="/home">Search</a>
              </DropDownItem>
              <DropDownItem>
                <img src="./images/watchlist-icon.svg" alt="home" />
                <a href="/home">Watchlist</a>
              </DropDownItem>
              <DropDownItem>
                <img src="./images/original-icon.svg" alt="home" />
                <a href="/home">Original</a>
              </DropDownItem>
              <DropDownItem>
                <img src="./images/series-icon.svg" alt="home" />
                <a href="/home">Series</a>
              </DropDownItem>
              <a onClick={handleAuth}>Sign Out</a>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  height: 60px;
  min-width: 80px;
  min-height: 50px;
  margin-top: 4px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }

  a {
    width: 100%;
    height: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      margin-right: 3px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        left: 0px;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: auto;
`;

const Login = styled.a`
  background-color: rgb(0, 0, 0, 0.6);
  padding: 8px 16px;
  margin-left: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 80%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 50%) 0px 0px 18px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 105px;
  opacity: 0;

  @media (max-width: 768px) {
    width: 120px;

    a {
      font-size: 12px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }
  }
`;

const DropDownItem = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    a {
      display: block;
      margin-bottom: 14px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: 7px;
    }
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 0.7s;
    }
  }
`;

export default Header;
