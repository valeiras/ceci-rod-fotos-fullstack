import('./server.js')
  .then(() => console.log('SERVER CORRECTLY WRAPPED'))
  .catch((e) => console.log('ERROR WRAPPING THE SERVER', e.message, e.stack));
