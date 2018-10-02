import RequestService from "./request.service";

function moveElements(array, id, newPosition) {
  const element = array.find(array => array.id === id);
  const oldPosition = element.position;

  return array.map(array => {
    if (array.id === id) {
      array.position = newPosition;
    } else {
      if (newPosition > oldPosition) {
        if (array.position <= newPosition) {
          array.position--;
        }
      } else {
        if (array.position >= newPosition) {
          array.position++;
        }
      }
    }
    return array;
  });
}

function updatePositions(array) {
  return array.sort((a, b) => a.position - b.position).map((element, index) => {
    element.position = index;
    return element;
  });
}

const KanbanService = {
  getBoardLists: async () => {
    return await RequestService.getBoard();
  },

  changeListName: async (inputList, id, newName) => {
    await RequestService.putList(id, { name: newName });
    return inputList.map(list => {
      if (list.id === id) {
        list.name = newName;
      }
      return list;
    });
  },

  addListToBoard: async inputLists => {
    const newList = {
      position: inputLists.length,
      name: `List ${inputLists.length + 1}`
    };

    const result = await RequestService.postList(newList);

    return [...inputLists, result];
  },

  deleteList: async (inputLists, idList) => {
    await RequestService.deleteList(idList);
    return updatePositions(inputLists.filter(list => list.id !== idList));
  },

  changeListPosition: async (inputLists, idList, newPosition) => {
    const newLists = moveElements(inputLists, idList, newPosition);
    await Promise.all(
      newLists.map(async list => {
        await RequestService.putList(list.id, { position: list.position });
      })
    );
    return newLists;
  },

  changeCardName: async (lists, idList, idCard, newName) => {
    await RequestService.putCard(idList, idCard, { name: newName });
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
  },

  addCardToList: (board, idList, newCard) => {
    return {
      lists: board.lists.map(list => {
        if (list.id === idList) {
          list.cards = [
            ...list.cards,
            {
              id: board.idLastCard,
              position: list.cards.length,
              ...newCard
            }
          ];
        }
        return list;
      }),
      idLastCard: board.idLastCard + 1
    };
  },

  moveCardToList: async (lists, idCard, idList, idNewList) => {
    const listIndex = lists.findIndex(list => list.id === idList);
    const cardToMove = lists[listIndex].cards.find(card => card.id === idCard);
    cardToMove.position = lists[listIndex].cards.length - 1;
    await RequestService.putCard(idList, idCard, {
      position: lists[listIndex].cards.length - 1
    });

    return lists.map(list => {
      if (list.id === idList) {
        list.cards = list.cards.filter(card => card.id !== idCard);
      }
      if (list.id === idNewList) {
        list.cards = [...list.cards, cardToMove];
      }
      return list;
    });
  },

  removeCard: async (lists, idList, idCard) => {
    await RequestService.deleteCard(idList, idCard);

    return lists.map(list => {
      if (list.id === idList) {
        list.cards = updatePositions(
          list.cards.filter(card => card.id !== idCard)
        );
      }
      return list;
    });
  }
};

export default KanbanService;
