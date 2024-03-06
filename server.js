const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/api/send-message', (req, res) => {
  const { message } = req.body;
  // Handle the message, e.g., send it to the WordPress site

  // Respond to the app
  res.json({ success: true, message: 'Message sent successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});