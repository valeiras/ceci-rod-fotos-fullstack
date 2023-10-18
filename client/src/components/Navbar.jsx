/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useRef, useState } from 'react';
import logo from '../assets/imgs/logo/logo_path.svg';
import { NavLink, useLoaderData } from 'react-router-dom';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { sections } = useLoaderData();

  const linksRef = useRef(null);
  const linksContainerRef = useRef(null);

  const handleBtnClick = () => {
    console.log(showLinks);
    setShowLinks(!showLinks);
  };

  const styleLinks = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : '0px',
  };

  return (
    <Nav className="Navbar">
      <div className="nav-logo-container">
        <img src={logo} className="nav-logo" alt="Ceci Rodríguez Fotos" />
      </div>
      <div
        className="nav-links-container"
        ref={linksContainerRef}
        style={styleLinks}
      >
        <div className="nav-links" ref={linksRef}>
          {sections.map((section) => {
            const { _id, name, friendlyUrlName } = section;
            return (
              <NavLink
                to={`/${friendlyUrlName}`}
                className="nav-link"
                key={_id}
                onClick={() => {
                  setShowLinks(false);
                }}
              >
                {name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="nav-button-container">
        <button
          type="button"
          className="nav-toggle"
          id="nav-toggle"
          onClick={handleBtnClick}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  flex: 0;
  width: 100vw;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;

  .nav-logo {
    height: 4rem;
    margin-left: 1rem;
  }

  .nav-icons {
    display: none;
  }

  .nav-logo-container {
    height: 5rem;
    display: flex;
    align-items: center;
    width: 20vw;
  }

  .nav-button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1rem;
    width: 20vw;
    height: 100%;
  }

  .nav-toggle {
    background: transparent;
    border: none;
    outline: none;
    font-size: 2rem;
    color: var(--color-3);
    cursor: pointer;
    transition: var(--transition);
    height: 4rem;
  }

  .nav-toggle:hover {
    transform: scale(1.1);
  }

  .nav-link {
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.98);
    color: var(--color-3);
    /* font-weight: 400; */
    margin: 0 auto;
    width: 100%;
  }

  .nav-link:last-of-type {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .nav-link.solid-bg:hover {
    background-color: var(--color-3);
    color: var(--color-1);
  }

  .nav-link:not(.current-section):not(.solid-bg):hover {
    color: var(--color-3);
    transform: scale(1.02);
  }

  .nav-links-container {
    transition: all 0.5s linear;
    overflow: hidden;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
  }

  .nav-links {
    display: grid;
    overflow: hidden;
    list-style-type: none;
    justify-items: left;
    padding-top: 1.5rem;
  }

  @media screen and (min-width: 1200px) {
    .nav-toggle {
      display: none;
    }

    .nav-links {
      height: auto;
      grid-template-columns: auto auto auto auto;
      grid-template-rows: auto auto;
      column-gap: 2rem;
      padding: 0 0;
      border-bottom: 1px solid var(--color-3);
      justify-items: left;
      margin-top: 0;
    }

    .nav-links-container {
      height: auto !important;
    }

    .nav-link {
      /* border-radius: 10px; */
      width: auto;
      min-width: 0;
      padding: 0 0;
      text-align: center;
      padding: 0.5rem;
      transition: var(--slow-transition);
      font-size: 1rem;
      margin: 0;
    }

    .nav-link:last-of-type {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }

    .nav-icons {
      display: flex;
    }

    .nav-link {
      margin-right: 0.7rem;
    }
    .nav-icon {
      margin-right: 0.7rem;
      color: var(--color-1);
      font-size: 1.2rem;
      transition: var(--transition);
    }
    .nav-icon:hover {
      color: var(--color-3);
    }
    .active {
      cursor: default;
      background-color: var(--color-1);
    }
  }
`;
