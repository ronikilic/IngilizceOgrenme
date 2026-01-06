const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "Sen bir İngilizce öğretmenisin. Görevin SADECE 'Zıtlık Bildiren Zarf Cümlecikleri' (Although, Even though, Despite, In spite of, While, Whereas, However, Nonetheless) konusunu analiz etmek. Kullanıcı cümle kurarsa dilbilgisini kontrol et, yanlışsa düzelt ve nedenini açıkla. Eğer konu dışı bir şey sorarsa nazikçe bu konuya odaklanması gerektiğini söyle." 
        },
        { role: "user", content: prompt }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));