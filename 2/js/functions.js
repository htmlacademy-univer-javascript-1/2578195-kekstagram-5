const makeRandomString = (string, length) => string.length <= length ? 'true' : 'false';

// Cтрока короче 20 символов
makeRandomString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
makeRandomString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
makeRandomString('проверяемая строка', 10); // false

const makeStringForCheck = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let revercedString = '';
  for (let i = newString.length - 1; i >= 0; i--){
    revercedString += newString[i];
  }
  return revercedString === newString;
};


// Строка является палиндромом
makeStringForCheck('топот'); // true
// Несмотря на разный регистр, тоже палиндром
makeStringForCheck('ДовОд'); // true
// Это не палиндром
makeStringForCheck('Кекс'); // false
// Это палиндром
makeStringForCheck('Лёша на полке клопа нашёл '); // true

const extractsNumbers = (string) =>{
  const str = string.toString();
  let result = '';

  for (let i = 0; i <= str.length; i++){
    const char = str[i];
    const digit = char.parseInt(char, 10);
    if (!Number.isNaN(digit)){
      result += digit;
    }
  }
  return result.length > 0 ? parseInt(result, 10) : NaN;
};

extractsNumbers('2023 год');// 2023
extractsNumbers('ECMAScript 2022');// 2022
extractsNumbers('1 кефир, 0.5 батона'); // 105
extractsNumbers('агент 007');// 7
extractsNumbers('а я томат'); // NaN

