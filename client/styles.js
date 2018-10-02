export const styles = {
  board: {
    backgroundColor: "#035050",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 30,
    overflow: "scroll"
  },
  boardHeader: {
    display: "flex",
    marginBottom: "20px",
    color: "#aad6d6",
    fontSize: "20px",
    fontWeight: "300"
  },
  boardActions: {
    cursor: "pointer",
    marginLeft: "20px",
    fontSize: "15px",
    display: "flex",
    width: "130px",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#4f9e9e"
  },
  boardLists: {
    display: "flex"
  },
  list: {
    backgroundColor: "#65ACAC",
    width: 300,
    marginRight: 20,
    padding: 10,
    border: "solid #082929 1px",
    borderRadius: "5px"
  },
  listTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#033131",
    fontWeight: "300"
  },
  listNameInput: {
    marginBottom: 10,
    width: 294
  },
  listCards: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: 10
  },
  card: {
    backgroundColor: "#c4e2e2",
    width: 280,
    marginBottom: 10,
    padding: 10,
    color: "#035050",
    display: "flex",
    border: "solid 1px #126767",
    borderRadius: "5px"
  },
  cardInterior: {
    display: "flex",
    justifyContent: "space-between",
    width: 280
  },
  deleteButton: {
    height: 20,
    width: 20,
    backgroundColor: "#65ACAC",
    border: "none",
    borderRadius: 5,
    border: "#d74340 solid 2px",
    color: "#d74340",
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    lineHeight: 0,
    cursor: "pointer"
  }
};
