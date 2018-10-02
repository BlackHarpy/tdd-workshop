module.exports = {
  lists: [
    { id: 1, name: "To Do", position: 0 },
    { id: 2, name: "Doing", position: 1 },
    { id: 3, name: "Done", position: 2 }
  ],
  cards: [
    { id: 1, name: "Task 1", position: 0, idList: 3 },
    { id: 2, name: "Task 2", position: 1, idList: 3 },
    { id: 3, name: "Task 3", position: 0, idList: 2 },
    { id: 4, name: "Task 4", position: 0, idList: 1 }
  ],

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
      id: this.lists.length + 1,
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
    return this.lists[listIndex];
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
      id: this.cards.length + 1,
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
    return this.cards[cardIndex];
  },

  deleteCard: async function(id) {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    this.cards[cardIndex].isDeleted = true;
    return Promise.resolve();
  }
};
