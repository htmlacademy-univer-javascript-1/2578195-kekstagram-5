const imageUploadModule = (() => {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const body = document.body;
  const cancelButton = document.querySelector('.img-upload__cancel');
  const previewImage = document.querySelector('.img-upload__preview img');

  const openOverlay = () => {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  const closeOverlay = () => {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  const init = () => {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          previewImage.src = reader.result;
          openOverlay();
        };
        reader.readAsDataURL(file);
      }
    });

    cancelButton.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    });
  };

  return { init, closeOverlay };
})();

export default imageUploadModule;
