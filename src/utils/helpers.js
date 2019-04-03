import moment from 'moment';
import SettingsStorage from '../services/storage/SettingsStorage';

export const chunkArray = (arr, size) => {
  const arrayLength = arr.length;
  const tempArray = [];

  for (let i = 0; i < arrayLength; i += size) {
    const myChunk = arr.slice(i, i + size);
    tempArray.push(myChunk);
  }
  return tempArray;
};

export const getTimestampUTC = date => moment.utc(date).unix();

export const inArray = (key, arr) => arr.indexOf(key) >= 0;

export const scrollToTop = () => {
  // if (window.scrollTo) {
  window.scrollTo(0, 0);
  // }
};

export const findOrCreateAsyncSetting = (settings) => {
  const results = Object.values(settings).map(async (item) => {
    const setting = await SettingsStorage.findOrCreate(item);
    return setting;
  });
  return Promise.all(results);
};

export const arrayToObject = (arr, keyField, valueField = null) => (
  Object.assign({}, ...arr.map(item => (
    { [item[keyField]]: valueField ? item[valueField] : item }
  )))
);

export const uniqueArray = array => array.filter((value, index, self) => (
  self.indexOf(value) === index && value.length
));

export const getAllUniqueWords = (text) => {
  if (text) {
    const allWords = text.toLowerCase().split(' ');
    return uniqueArray(allWords);
  }
  return [];
};
