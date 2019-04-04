import moment from 'moment';

export const getTimestampUTC = date => moment.utc(date).unix();

export const inArray = (key, arr) => arr.indexOf(key) >= 0;

export const scrollToTop = () => {
  // if (window.scrollTo) {
  window.scrollTo(0, 0);
  // }
};

export const keyObjects = (arr, keyField, valueField = null) => (
  Object.assign({}, ...arr.map(item => (
    { [item[keyField]]: valueField ? item[valueField] : item }
  )))
);

export const uniqueArray = (array, keepEmpty = false) => array.filter((value, index, self) => {
  if (keepEmpty) {
    return self.indexOf(value) === index;
  }
  // console.log(self.indexOf(value),value.trim().length );
  return self.indexOf(value) === index && value !== '' && value !== ' ';
});

export const getAllUniqueWords = (text) => {
  if (text) {
    const allWords = text.toLowerCase().replace(/[\W_]+/g, ' ').split(' ');
    return uniqueArray(allWords, false);
  }
  return [];
};
