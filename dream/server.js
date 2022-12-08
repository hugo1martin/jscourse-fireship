import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
        })

        const image = aiResponse.data.data[0].url;
        res.send({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});