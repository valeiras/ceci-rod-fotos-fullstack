/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
import logo from '../assets/imgs/logo/logo_path.svg';
import { FADING_TIME1 } from '../constants';
const Navbar = ({ sections }) => {
  const {
    currSection,
    isSectionChanging,
    setIsSectionChanging,
    setSectionById,
    showLinks,
    setShowLinks,
  } = useGlobalContext();

  useEffect(() => setSectionById(0), []);

  const handleNavbarClick = (sectionId) => {
    document.querySelector('.mobile-gallery')?.scrollTo(0, 0);

    if (sectionId != currSection.id) {
      setIsSectionChanging(true);
      setTimeout(() => {
        setSectionById(sectionId);
      }, FADING_TIME1);
    }
  };

  const linksRef = useRef(null);
  const linksContainerRef = useRef(null);

  const handleBtnClick = () => {
    setShowLinks(!showLinks);
  };

  const styleLinks = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : '0px',
  };

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={logo} className="nav-logo" alt="Ceci Rodríguez Fotos" />
      </div>
      <div
        className="nav-links-container"
        ref={linksContainerRef}
        style={styleLinks}
      >
        <ul className="nav-links" ref={linksRef}>
          {sections.map((section) => {
            const { id, name } = section;
            return (
              <li
                key={id}
                className={
                  'nav-link' +
                  (showLinks ? ' solid-bg' : '') +
                  (id === currSection.id && !isSectionChanging
                    ? ' current-section'
                    : '')
                }
                onClick={() => {
                  {
                    handleNavbarClick(section.id);
                    setShowLinks(false);
                  }
                }}
              >
                {name}{' '}
              </li>
            );
          })}
        </ul>
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
    </nav>
  );
};

export default Navbar;
