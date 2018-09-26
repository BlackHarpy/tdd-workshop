module.exports = {
  lists: [],
  cards: [],

  selectAllLists: async function() {
    const activeLists = this.lists.filter(list => !list.isDeleted).map(list => {
      return {
        id: list.id,
        name: list.name,
        position: list.position
      };
    });
    return activeLists;
  },

  insertList: async function(listData) {
    const newList = {
      id: this.lists.length,
      position: listData.position,
      name: listData.name,
      isDeleted: false
    };
    this.lists.push(newList);
    return {
      id: newList.id,
      position: newList.position,
      name: newList.name,
      cards: newList.cards
    };
  },

  updateList: async function(updatedList) {
    const listIndex = this.lists.findIndex(list => list.id === updatedList.id);
    this.lists[listIndex] = {
      ...this.lists[listIndex],
      ...updatedList
    };
    return {
      ...updatedList
    };
  },

  deleteList: async function(id) {
    const listIndex = this.lists.findIndex(list => list.id === id);
    const idsCardsInList = this.cards
      .filter(card => card.idList === id)
      .map(card => card.id);
    idsCardsInList.forEach(id => {
      this.deleteCard(id);
    });
    this.lists[listIndex].isDeleted = true;
    return true;
  },

  selectCardsByList: async function(idList) {
    return this.cards.filter(card => card.idList === idList);
  },

  insertCard: async function(cardData) {
    const newCard = {
      id: this.cards.length,
      position: cardData.position,
      name: cardData.name,
      idList: cardData.idList,
      isDeleted: false
    };
    this.cards.push(newCard);
    return {
      id: newCard.id,
      position: newCard.position,
      name: newCard.name,
      idList: newCard.idList
    };
  },

  updateCard: async function(updatedCard) {
    const cardIndex = this.cards.findIndex(card => card.id === updatedCard.id);
    this.cards[cardIndex] = {
      ...this.cards[cardIndex],
      ...updatedCard
    };
    return {
      ...updatedCard
    };
  },

  deleteCard: async function(id) {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    this.cards[cardIndex].isDeleted = true;
    return Promise.resolve();
  }
};
