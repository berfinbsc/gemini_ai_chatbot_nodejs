const express = require('express');
const cors = require('cors'); // cors paketini import edin
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
require('dotenv').config();
const api =process.env.API_KEY;
const genAI = new GoogleGenerativeAI(api);





app.get('/',  (req, res) => {
    res.status(200).json({ message: "hello world" });
});




app.post('/message', async (req, res) => {
  const { message, history } = req.body;
console.log(history);
console.log(message);

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({
    history:history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  

try {
  
  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  console.log("text :: :: ",text);
  console.log("response :: ::",response);
  res.send(text);

} catch (error) {
  console.log(error);
}


});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
