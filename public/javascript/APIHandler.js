//let baseUrl = 'http://localhost:8000/characters';
class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    return axios.get(`${this.BASE_URL}/characters`)
  }

  getOneRegister (id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`)
  }

  createOneRegister () {
    return axios.get(`${this.BASE_URL}/characters`)

  }

  updateOneRegister (id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`)
  }

  deleteOneRegister (id) {
    let letsDelete = axios.get(`${this.BASE_URL}/characters/${id}`);
    return letsDelete
}
}





