import dummyService from "./dummy-service";
const serverUrl = "http://someserver.api.com/person";

export default (UtilsService = {
  createPerson: data => {
    dummyService.makeServerRequest(serverUrl, "POST", data);
  },
  updatePerson: (idPerson, data) => {
    dummyService.makeServerRequest(serverUrl + "/" + idPerson, "POST", data);
  },

  deletePerson: idPerson => {
    dummyService.makeServerRequest(serverUrl + "/" + idPerson, "DELETE");
  },

  openModal: errorCode => {
    switch (errorCode) {
      case 200:
        dummyService.openSuccessModal();
      case 400:
        dummyService.openErrorModal();
    }
  }
});
