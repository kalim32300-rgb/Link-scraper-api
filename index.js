const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root endpoint test karne ke liye
app.get('/', (req, res) => {
  res.send('Link Scraper API is running successfully!');
});

// Main Scraping API Endpoint
app.get('/api/scrape', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    // Server response wapas bhej raha hai
    res.json({ 
      success: true, 
      data: response.data 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch the requested URL', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
