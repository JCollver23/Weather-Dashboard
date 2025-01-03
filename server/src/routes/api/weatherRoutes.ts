import { Router, type Request, type Response } from 'express';
const router = Router();

// Import HistoryService and WeatherService
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body; // Get the city name from the request body

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Get weather data from WeatherService
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save the city to search history
    await HistoryService.addCity(city);

    // Return the weather data as a response
    return res.json({ weather: weatherData, message: `Weather for ${city} fetched and saved to history.` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching weather data or saving city to history.' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // Get all cities from HistoryService
    const cities = await HistoryService.getCities();

    // Return the cities in the response
    return res.json({ cities });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching search history.' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Get the city ID from the URL parameter

  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    // Remove the city from HistoryService
    await HistoryService.removeCity(id);

    // Return a success message
    return res.json({ message: `City with ID ${id} removed from search history.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error removing city from search history.' });
  }
});

export default router;
