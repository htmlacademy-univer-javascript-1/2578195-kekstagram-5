const formValidationModule = (() => {
  const hashtagInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  const SETTINGS = {
    MAX_HASHTAGS: 5,
    MAX_HASHTAG_LENGTH: 20,
    MAX_COMMENT_LENGTH: 140,
  };

  const validateField = (inputElement, errors) => {
    if (errors.length > 0) {
      inputElement.setCustomValidity(errors.join('\n'));
    } else {
      inputElement.setCustomValidity('');
    }
    inputElement.reportValidity();
  };

  const validateHashtags = () => {
    const hashtags = hashtagInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const errors = [];

    if (hashtags.length > SETTINGS.MAX_HASHTAGS) {
      errors.push(`Нельзя указать больше ${SETTINGS.MAX_HASHTAGS} хэш-тегов.`);
    }

    const uniqueTags = new Set(hashtags);
    if (uniqueTags.size !== hashtags.length) {
      errors.push('Хэш-теги должны быть уникальными.');
    }

    hashtags.forEach((tag) => {
      if (!/^#[a-zA-Z0-9]+$/.test(tag)) {
        errors.push(`Хэш-тег "${tag}" должен начинаться с "#" и состоять только из букв и цифр.`);
      } else if (tag.length > SETTINGS.MAX_HASHTAG_LENGTH) {
        errors.push(`Хэш-тег "${tag}" не может быть длиннее ${SETTINGS.MAX_HASHTAG_LENGTH} символов.`);
      } else if (tag === '#') {
        errors.push('Хэш-тег не может состоять только из "#".');
      }
    });

    return errors;
  };

  const init = () => {
    hashtagInput.addEventListener('input', () => {
      const errors = validateHashtags();
      validateField(hashtagInput, errors);
    });

    commentInput.addEventListener('input', () => {
      const comment = commentInput.value.trim();
      const errors = [];
      if (comment.length > SETTINGS.MAX_COMMENT_LENGTH) {
        errors.push(`Комментарий не должен превышать ${SETTINGS.MAX_COMMENT_LENGTH} символов.`);
      }
      validateField(commentInput, errors);
    });
  };

  return { init };
})();

export default formValidationModule;
