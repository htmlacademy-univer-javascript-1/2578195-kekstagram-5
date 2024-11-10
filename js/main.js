/* eslint-disable no-console */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createComment(id) {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const names = ['Анна', 'Сергей', 'Мария', 'Алексей', 'Ирина'];

  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages[getRandomInt(0, messages.length - 1)],
    name: names[getRandomInt(0, names.length - 1)]
  };
}

function createPhoto(id) {
  const comments = Array.from({ length: getRandomInt(0, 30) }, (_, i) => createComment(id * 100 + i));

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Я на олимпиаде по программировании',
    likes: getRandomInt(15, 200),
    comments: comments
  };
}

function generatePhotos() {
  return Array.from({ length: 25 }, (_, i) => createPhoto(i + 1));
}

const photos = generatePhotos();
console.log(photos);
