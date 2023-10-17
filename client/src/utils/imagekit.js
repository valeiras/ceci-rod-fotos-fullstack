import ImageKit from 'imagekit-javascript';

const urlEndpoint = 'https://ik.imagekit.io/lyhvtcigz';
const publicKey = 'public_e7VfV805TAnLcqFcKq6bl2LNmzA=';

const imagekit = new ImageKit({
  urlEndpoint,
  publicKey,
});

export default imagekit;
