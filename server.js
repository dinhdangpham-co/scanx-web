// ScanX AI — Web Server v3.2
// Express server with GAS proxy for web scanner
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;
const GAS_URL = process.env.GAS_URL || 'https://script.google.com/macros/s/AKfycbzInJ5huIiuUYj4p5nsHRUyiMUC6mH6WtG0ITf59H9hxnh532WhRyCJT5klvjrUAbS2nA/exec';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GAS proxy — browser can't call GAS directly (CORS)
app.post('/api/gas', async (req, res) => {
  try {
    const resp = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(req.body),
      redirect: 'follow'
    });
    const text = await resp.text();
    try { res.json(JSON.parse(text)); }
    catch { res.status(502).json({ ok: false, error: 'Invalid GAS response' }); }
  } catch (err) {
    res.status(502).json({ ok: false, error: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'ScanX AI', v: '3.2' }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`ScanX AI running on port ${PORT}`));
