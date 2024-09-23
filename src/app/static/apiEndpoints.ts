const apiEndpoints = {
  _baseURL: 'http://localhost:3000/api', // TODO: get value from .env file
  getRandomPokemons: '/pokemon?random=true&limit=%d',
  getAllPokemons: '/pokemon',
  findByName: '/pokemon?name=%s',
  searchByName: '/pokemon?byName=%s',
  create: '/pokemon',
  upload: '/upload',
  image: '/image'
};

export default apiEndpoints;
