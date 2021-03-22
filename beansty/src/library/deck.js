import {saveJSON, fetchJSON} from './storage';

const key = 'deck';

const deckStore = {
  fetch () {
    return fetchJSON(key, []);
  },
  store (decks) {
    return saveJSON(key, decks);
  }
};

export default deckStore;