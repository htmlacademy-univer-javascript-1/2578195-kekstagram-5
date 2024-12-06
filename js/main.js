import imageUploadModule from './imageUploadModule.js';
import scaleModule from './scaleModule.js';
import effectsModule from './effectsModule.js';
import formValidationModule from './formValidationModule.js';

document.addEventListener('DOMContentLoaded', () => {
  imageUploadModule.init();
  scaleModule.init();
  effectsModule.init();
  formValidationModule.init();
});
