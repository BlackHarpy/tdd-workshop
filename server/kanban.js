const dbLibrary = require("./kindaDatabaseService");

module.exports = {
  getAllListsFromBoard: async () => {
    try {
      const lists = await dbLibrary.selectAllLists();
      const listsWithCards = await Promise.all(
        lists.map(async list => {
          return {
            ...list,
            cards: await dbLibrary.selectCardsByList(list.id)
          };
        })
      );
      return { status: 200, data: listsWithCards };
    } catch (e) {
      return { status: 500, error: e };
    }
  }
};
