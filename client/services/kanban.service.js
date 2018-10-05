import RequestService from "./request.service";

const KanbanService = {
  getBoardLists: async () => {
    return await RequestService.getBoard();
  },

  changeListName: (inputList, id, newName) => {
    return inputList.map(list => {
      if (list.id === id) {
        list.name = newName;
      }
      return list;
    });
  },

  changeCardName: (lists, idList, idCard, newName) => {
    return lists.map(list => {
      if (list.id === idList) {
        list.cards = list.cards.map(card => {
          if (card.id === idCard) {
            card.name = newName;
          }
          return card;
        });
      }
      return list;
    });
  }
};

export default KanbanService;
