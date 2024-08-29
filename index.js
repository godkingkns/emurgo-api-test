const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const port = 3000;
const cache = new NodeCache();

const API_KEY = 'f1d321c3e0c9083840270e27e3cd914d';
const BASE_URL = 'https://gnews.io/api/v4';

app.use(express.json());

// Fetching N new articles
app.get('/articles/new/:count', async (req, res) => {
    const { count } = req.params;

    if (count <= 0 ) {
        return res.status(400).json({ error: 'News count should be great than 0.' });
    }

    try {
        const cacheKey = `new-${count}`;
        let data = cache.get(cacheKey);

        if (!data) {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    apikey: API_KEY,
                    category: 'general',
                    lang: 'en',
                    max: count
                }
            });

            data = response.data;
            cache.set(cacheKey, data, 3600);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Find new articles by title or author
app.get('/articles/find', async (req, res) => {
    const { title, author } = req.query;

    if (!title && !author) {
        return res.status(400).json({ error: 'Please provide a title or author.' });
    }

    try {
        const cacheKey = `find-${title || author}`;
        let data = cache.get(cacheKey);

        if (!data) {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    apikey: API_KEY,
                    q: `${title} OR ${author}`,
                    in: 'title,description',
                    lang: 'en'
                }
            });
            data = response.data;
            cache.set(cacheKey, data, 3600);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search articles by keyword
app.get('/articles/search', async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Please provide a search keyword.' });
    }

    try {
        const cacheKey = `search-${keyword}`;
        let data = cache.get(cacheKey);

        if (!data) {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    apikey: API_KEY,
                    q: keyword,
                    lang: 'en'
                }
            });
            data = response.data;
            cache.set(cacheKey, data, 3600);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
