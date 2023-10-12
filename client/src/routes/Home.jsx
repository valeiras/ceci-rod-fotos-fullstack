/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import { sections } from '../data';
import { Navbar, FullPageImage, Gallery } from '../components';

import { useGlobalContext } from '../context';

const Home = () => {
  const { showFullPage } = useGlobalContext();

  return (
    <div className="app">
      <Navbar sections={sections} />
      <Gallery />
      {showFullPage && <FullPageImage />}
    </div>
  );
};
export default Home;
