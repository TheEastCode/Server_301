const express = require('express');
const axios = require('axios');
const router = express.Router();

const generateDallImage = async (prompt) => {
    try {
        const DALL_API_KEY = process.env.DALL_API_KEY;
        const DALL_E_API_URL = 'https://api.openai.com/v1/chat/completions';
        const response = await axios.post(
            DALL_E_API_URL,
            { prompt },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DALL_API_KEY}`
                }
            }
        );

        return { image_url: response.data.image_url };
    } catch (error) {
        console.error('Error calling DALL.E API', error.message);
        throw error;
    }
};

router.post('/generate-dalle-image', async (req, res) => {
    const { prompt } = req.body;

    const obj = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", prompt }],
        "temperature": 0.7
    }

    console.log(prompt)

    try {
        const imageData = await generateDallImage(obj);
        res.json(imageData); // Send back the full image data
    } catch (error) {
        console.error('Error generating DALL.E image', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;