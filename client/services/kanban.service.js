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
    return await (await fetch("http://localhost:8080/board")).json();
  },

  changeListName: (inputList, id, newName) => {
    return inputList.map(list => {
      if (list.id === id) {
        list.name = newName;
      }
      return list;
    });
  },

  addListToBoard: inputLists => {
    return [
      ...inputLists,
      {
        id: inputLists.length + 1,
        position: inputLists.length,
        name: `List ${inputLists.length + 1}`,
        cards: []
      }
    ];
  },

  deleteList: (inputLists, idList) => {
    return updatePositions(inputLists.filter(list => list.id !== idList));
  },

  changeListPosition: (inputLists, idList, newPosition) => {
    return moveElements(inputLists, idList, newPosition);
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

  moveCardToList: (lists, idCard, idList, idNewList) => {
    const listIndex = lists.findIndex(list => list.id === idList);
    const cardToMove = lists[listIndex].cards.find(card => card.id === idCard);
    return lists.map(list => {
      if (list.id === idList) {
        list.cards = list.cards.filter(card => card.id !== idCard);
      }
      if (list.id === idNewList) {
        list.cards = [
          ...list.cards,
          { ...cardToMove, position: list.cards.length }
        ];
      }
      return list;
    });
  },

  removeCard: (lists, idList, idCard) => {
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
