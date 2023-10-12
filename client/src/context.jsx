/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { sections } from './data';
import shuffle from 'shuffle-array';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const ContextProvider = ({ children }) => {
  const firstSection = sections.find((section) => section.id === 0);
  const firstImage = firstSection.imgs.find((img) => img.id === 0);

  const [currSection, setCurrSection] = useState(firstSection);
  const [currImage, setCurrImage] = useState(firstImage);
  const [showImageInfo, setShowImageInfo] = useState(false);

  const [isSectionChanging, setIsSectionChanging] = useState(true);
  const [isImageChanging, setIsImageChanging] = useState(false);

  const [showLinks, setShowLinks] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  const setSectionById = (sectionId) => {
    const nextSection = sections.find((section) => section.id === sectionId);
    nextSection.imgs = shuffle(nextSection.imgs).map((img, idx) => {
      return { ...img, id: idx };
    });
    setCurrImage(nextSection.imgs[0]);
    setCurrSection(nextSection);
  };

  const setImageById = (imgId) => {
    setCurrImage(currSection.imgs.find((img) => img.id === imgId));
  };

  return (
    <GlobalContext.Provider
      value={{
        currSection,
        setCurrSection,
        currImage,
        setCurrImage,
        setSectionById,
        setImageById,
        isSectionChanging,
        setIsSectionChanging,
        isImageChanging,
        setIsImageChanging,
        showLinks,
        setShowLinks,
        showFullPage,
        setShowFullPage,
        showImageInfo,
        setShowImageInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
