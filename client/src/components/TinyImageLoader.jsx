import { useGlobalContext } from '../context';

const TinyImageLoader = () => {
  const { currSection } = useGlobalContext();
  return (
    <div style={{ visibility: 'hidden', position: 'absolute' }}>
      {currSection.imgs.map(({ pathTy, id }) => (
        <img src={pathTy} key={id}></img>
      ))}
    </div>
  );
};
export default TinyImageLoader;
