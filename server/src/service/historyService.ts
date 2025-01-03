// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  // Constructor to initialize the City class with id and name
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
import { v4 as uuidv4 } from 'uuid';  // Import UUID for unique city IDs

class HistoryService {
  private cities: City[] = [];

  // Asynchronous method to get cities (simulated as in-memory storage)
  async getCities() {
    // In a real app, this could be fetching from a database or file
    return this.cities;
  }

  // Asynchronous method to add a city
  async addCity(name: string) {
    const id = uuidv4();  // Generate a unique ID for the city
    this.cities.push({ id, name });  // Add the city to the list
  }

  // Asynchronous method to remove a city by ID
  async removeCity(id: string) {
    this.cities = this.cities.filter(city => city.id !== id);  // Remove city from the list
  }
}

export default new HistoryService();