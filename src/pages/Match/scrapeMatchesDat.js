import { BACKEND_URL_BASE } from "../../stores/url_base";

export const handleScrape = async ({selectedDate}) => {
    const date = selectedDate.format('YYYY-MM-DD'); // Asegúrate de formatear la fecha
    try {
      const response = await fetch(`${BACKEND_URL_BASE}/matches?date=${date}`);
      const data = await response.json();
      if (data.success) {
        console.log('Matches scraped successfully:', data.matches);
        // Aquí puedes actualizar tu estado o mostrar los resultados en la UI
      } else {
        console.error('Error scraping matches:', data.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };