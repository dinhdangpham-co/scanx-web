// ScanX AI — Minimal Render Server v3.1
// Just serves a landing page. All logic is in the Chrome Extension + GAS.
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/health', (req, res) => res.json({ ok: true, service: 'ScanX AI', version: '3.1' }));

app.listen(PORT, () => {
  console.log(`ScanX AI Dashboard running on port ${PORT}`);
});
