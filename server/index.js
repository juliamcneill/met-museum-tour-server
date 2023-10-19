const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const resend = require('resend');
require('dotenv').config();

console.log('i dont work', process.env.RESEND_API_KEY);
const resendInstance = new resend.Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(bodyParser.json());

app.get('/route', (req, res) => {
  res.status(200).json('Server is working!');
});

app.get('/emailRoute', async (req, res) => {
  const data = await resendInstance.sendEmail({
    from: 'mettour@juliamcneill.com',
    to: 'juliammcneill@gmail.com',
    subject: 'Your MET Tour',
    react: `<div>Hi!</div>`,
  });

  return res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
