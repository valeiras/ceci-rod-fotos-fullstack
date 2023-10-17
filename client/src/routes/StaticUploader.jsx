import customFetch from '../utils/customFetch';
import { sections } from '../data';
import { pictureProps, propsToTags } from '../data/pictureData';

const StaticUploader = () => {
  let count = 0;
  const uploadStaticFiles = async () => {
    sections.forEach(async ({ name: sectionName, imgs }) => {
      // const currSection = await customFetch.post('/sections', { name });
      imgs.forEach(({ name: imageName, info }) => {
        const infoObj = { ...propsToTags };
        pictureProps.forEach((prop) => {
          infoObj[prop] = info[propsToTags[prop]] || imageName;
        });

        const filepath = `/imgs/Large/${sectionName}/${imageName}.jpg`;
        if (count++ < 1) {
          console.log(filepath);
        }
      });
    });
  };
  return (
    <div>
      <button className="btn" onClick={uploadStaticFiles}>
        Upload!
      </button>
    </div>
  );
};
export default StaticUploader;
