const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const cancelButton = document.querySelector('.img-upload__cancel');
const previewImage = document.querySelector('.img-upload__preview img');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result; // Подставляем изображение
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
    };
    reader.readAsDataURL(file);
  }
});

const closeOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

cancelButton.addEventListener('click', closeOverlay);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay();
  }
});

// Элементы управления масштабом
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');

// Начальный масштаб
let scaleValue = 100;

// Функция для обновления масштаба
const updateScale = () => {
  previewImage.style.transform = `scale(${scaleValue / 100})`;
  scaleValueInput.value = `${scaleValue}%`;
};

// Обработчики событий для кнопок
smallerButton.addEventListener('click', () => {
  if (scaleValue > 25) { // Минимальный масштаб — 25%
    scaleValue -= 25;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  if (scaleValue < 100) { // Максимальный масштаб — 100%
    scaleValue += 25;
    updateScale();
  }
});

// Инициализация начального масштаба
updateScale();

// Элементы управления
const effects = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

// Настройки эффектов
const EFFECTS = {
  none: {
    filter: '',
    unit: '',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    hideSlider: true,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    hideSlider: false,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    hideSlider: false,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    hideSlider: false,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    hideSlider: false,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    hideSlider: false,
  },
};

// Инициализация слайдера
noUiSlider.create(effectSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Функция для применения эффекта
const applyEffect = (effect) => {
  if (effect.hideSlider) {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    effectLevelValue.value = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step,
    });
    previewImage.style.filter = `${effect.filter}(${effect.start}${effect.unit})`;
    effectLevelValue.value = effect.start;
  }
};

// Сброс эффекта при смене
effects.forEach((effectInput) => {
  effectInput.addEventListener('change', (event) => {
    const effectName = event.target.value;
    const effectSettings = EFFECTS[effectName];
    applyEffect(effectSettings);
  });
});

// Обновление фильтра при изменении слайдера
effectSlider.noUiSlider.on('update', (values) => {
  const activeEffect = document.querySelector('.effects__radio:checked').value;
  const effectSettings = EFFECTS[activeEffect];
  const value = values[0];
  previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit})`;
  effectLevelValue.value = value;
});

// Применить настройки по умолчанию
applyEffect(EFFECTS.none);
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const SETTINGS = {
  MAX_HASHTAGS: 5,
  MAX_HASHTAG_LENGTH: 20,
  MAX_COMMENT_LENGTH: 140,
};

// Вспомогательная функция для валидации
const validateField = (inputElement, errors) => {
  if (errors.length > 0) {
    inputElement.setCustomValidity(errors.join('\n'));
  } else {
    inputElement.setCustomValidity('');
  }
  inputElement.reportValidity();
};

// Функция для валидации хэш-тегов
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

// Обработка ввода хэш-тегов
hashtagInput.addEventListener('input', () => {
  const errors = validateHashtags();
  validateField(hashtagInput, errors);
});

// Валидация комментария
commentInput.addEventListener('input', () => {
  const comment = commentInput.value.trim();
  const errors = [];
  if (comment.length > SETTINGS.MAX_COMMENT_LENGTH) {
    errors.push(`Комментарий не должен превышать ${SETTINGS.MAX_COMMENT_LENGTH} символов.`);
  }
  validateField(commentInput, errors);
});

// Блокировка закрытия формы по Escape
const preventFormCloseOnEscape = (inputElement) => {
  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
    }
  });
};

preventFormCloseOnEscape(hashtagInput);
preventFormCloseOnEscape(commentInput);


const form = document.querySelector('#upload-select-image'); // Форма загрузки изображения
const submitButton = document.querySelector('#upload-submit'); // Кнопка отправки
const URL = 'https://29.javascript.htmlacademy.pro/kekstagram'; // URL для отправки данных

// Функция блокировки кнопки
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Загрузка...' : 'Опубликовать';
};

// Функция для отображения сообщений из шаблона
const showMessage = (templateId, onClose = null) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  const message = template.querySelector(`.${templateId}`);

  document.body.appendChild(message);

  const closeButton = message.querySelector(`.${templateId}__button`);
  const closeMessage = () => {
    document.body.removeChild(message);

    if (onClose) {
      onClose();
    }
  };

  closeButton.addEventListener('click', closeMessage);

  const onEscPress = (event) => {
    if (event.key === 'Escape') {
      closeMessage();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);
};

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  const formData = new FormData(form); // Собираем данные формы
  toggleSubmitButton(true); // Блокируем кнопку

  fetch(URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка отправки данных');
      }
      return response.json();
    })
    .then(() => {
      showMessage('success', () => form.reset()); // Показ сообщения об успешной загрузке и сброс формы
    })
    .catch(() => {
      showMessage('error'); // Показ сообщения об ошибке
    })
    .finally(() => {
      toggleSubmitButton(false); // Разблокируем кнопку
    });
});

