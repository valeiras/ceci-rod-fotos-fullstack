import ImageKit from 'imagekit-javascript';

const urlEndpoint = 'https://ik.imagekit.io/lyhvtcigz';
const publicKey = 'public_e7VfV805TAnLcqFcKq6bl2LNmzA=  ';
const authenticationEndpoint = 'http://localhost:5100/api/v1/auth/imagekit';

const imagekit = new ImageKit({
  urlEndpoint,
  publicKey,
  authenticationEndpoint,
});

export default imagekit;
