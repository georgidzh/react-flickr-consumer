/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/**
 * Based on https://github.com/dfahlander/Dexie.js/blob/master/samples/full-text-search/FullTextSearch2.js
 */
import Dexie from 'dexie';
import { getAllUniqueWords } from '../../utils/helpers';

export const SEARCH_TABLE_FIELD_TITLE = 't';
export const SEARCH_TABLE_FIELD_TAG = 'a';

const indexedDbVersion = 1;
/*
* Indexes schemas:
*
* first = primaryKey (always unique), & = unique index, * = multiEntry index
*/
const postsSchema = 'flickrId,tags,title,createdAt';
// this schema is needed to work with IE the '*' does not work on IE;
// This object store is a "view". It will contain mappings
// between all search fields words.
const postsSearchSchema = '++,flickrId,word,field,[field+word]';

const settingsSchema = 'key';

const db = new Dexie('flickr-feed-consumer');
db.version(indexedDbVersion).stores({
  posts: postsSchema,
  _postWords: postsSearchSchema,
  settings: settingsSchema,
});

/**
 * Override db._createTransaction() to make sure to add _postsWords table to
 * any transaction being modified. If not doing this, error will occur in the
 * hooks unless the application code has included _postsWords in the transaction
 * when modifying emails table.
 */
db._createTransaction = Dexie.override(db._createTransaction, createTransaction => (
  (mode, storeNames, dbSchema) => {
    if (mode === 'readwrite' && storeNames.indexOf('_postWords') === -1) {
      // eslint-disable-next-line no-param-reassign
      storeNames = storeNames.slice(0);
      storeNames.push('_postWords');
    }
    return createTransaction.call(this, mode, storeNames, dbSchema);
  }));

/**
 * 1: Must wait till we have the key.
 * 2: Lock transaction until we got primary key and added all mappings.
 *    App code trying to read from _postWords the line after having
 *    added a post must then wait until we are done writing the mappings.
 */
db.posts.hook('creating', function (primKey, obj, trans) {
  trans._lock();
  this.onsuccess = function (key) {
    // Add mappings for all unique words in title with excluded common words like 'and'
    getAllUniqueWords(obj.title).forEach((word) => {
      db._postWords.add({ word, flickrId: key, field: SEARCH_TABLE_FIELD_TITLE });
    });
    // Add mappings to all tags.
    obj.tags.forEach((word) => {
      db._postWords.add({ word, flickrId: key, field: SEARCH_TABLE_FIELD_TAG });
    });
    trans._unlock();
  };
  this.onerror = function () {
    trans._unlock();
  };
});


// when a post is deleted clear all search mappings
// eslint-disable-next-line no-unused-vars
db.posts.hook('deleting', (primKey, obj, trans) => {
  if (obj.message) {
    db._postWords.where('flickrId').equals(primKey).delete();
  }
});


export default db;
