const express = require('express');
const cors = require('cors'); // cors paketini import edin
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
// CORS ayarlarını yapılandırın
app.use(cors({
  origin: '*'
}));
// Gövde verilerini ayrıştırmak için middleware
app.use(express.json());
require('dotenv').config();

const api =process.env.API_KEY;



const genAI = new GoogleGenerativeAI(api);



app.get('/',  (req, res) => {
    res.status(200).json({ message: "hello world" });
});

app.post('/message', async (req, res) => {
  const { message, history } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({
    history:history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  res.json({history});

});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
