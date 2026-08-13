import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

// Helper to read JSON file safely
const readData = (filePath, defaultData = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
  }
  return defaultData;
};

// Helper to write JSON file safely
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e.message);
    return false;
  }
};

// Default sample wishes
const INITIAL_WISHES = [
  {
    id: 'sample-1',
    name: 'Vijaya Lakshmi',
    msg: 'Wishing you both a lifetime of love and happiness! Congratulations Hari Chandana & Harsha! 💐',
    createdAt: new Date().toISOString(),
    formattedTime: 'Aug 2026'
  },
  {
    id: 'sample-2',
    name: 'Ravi Kumar',
    msg: 'Telugu Subhakankshalu! May God bless this beautiful couple always. 🌸',
    createdAt: new Date().toISOString(),
    formattedTime: 'Aug 2026'
  },
  {
    id: 'sample-3',
    name: 'Srinivasa Rao',
    msg: 'Congratulations to the lovely couple! May your journey together be full of joy! ✨',
    createdAt: new Date().toISOString(),
    formattedTime: 'Aug 2026'
  }
];

// Initialize wishes file if empty
if (!fs.existsSync(WISHES_FILE)) {
  writeData(WISHES_FILE, INITIAL_WISHES);
}

// ===== API ENDPOINTS =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Hari Chandana & Veera Harsha Vardhan Wedding Backend',
    developer: 'Ganesh Charan Peddada',
    timestamp: new Date().toISOString()
  });
});

// GET /api/wishes — Retrieve all blessings
app.get('/api/wishes', (req, res) => {
  const wishes = readData(WISHES_FILE, INITIAL_WISHES);
  res.json({ success: true, count: wishes.length, wishes });
});

// POST /api/wishes — Submit a new blessing
app.post('/api/wishes', (req, res) => {
  const { name, msg } = req.body;

  if (!name || !msg) {
    return res.status(400).json({ success: false, error: 'Name and message are required.' });
  }

  const wishes = readData(WISHES_FILE, INITIAL_WISHES);
  const newWish = {
    id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    msg: msg.trim(),
    emojis: {},
    createdAt: new Date().toISOString(),
    formattedTime: new Date().toLocaleString()
  };

  wishes.unshift(newWish);
  writeData(WISHES_FILE, wishes);

  console.log(`[BACKEND] New wish received from: ${newWish.name}`);
  res.status(201).json({ success: true, wish: newWish });
});

// GET /api/rsvps — Retrieve all RSVPs (Admin)
app.get('/api/rsvps', (req, res) => {
  const rsvps = readData(RSVPS_FILE, []);
  res.json({ success: true, count: rsvps.length, rsvps });
});

// POST /api/rsvp — Submit RSVP confirmation
app.post('/api/rsvp', (req, res) => {
  const { name, attend, guests, msg } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  const rsvps = readData(RSVPS_FILE, []);
  const newRsvp = {
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    attend: attend || 'yes',
    guests: guests || '1',
    msg: msg ? msg.trim() : '',
    createdAt: new Date().toISOString(),
    formattedTime: new Date().toLocaleString()
  };

  rsvps.unshift(newRsvp);
  writeData(RSVPS_FILE, rsvps);

  // If RSVP included a message, also store in wishes
  if (msg && msg.trim()) {
    const wishes = readData(WISHES_FILE, INITIAL_WISHES);
    wishes.unshift({
      id: `wish-${Date.now()}`,
      name: name.trim(),
      msg: msg.trim(),
      emojis: {},
      createdAt: new Date().toISOString(),
      formattedTime: new Date().toLocaleString()
    });
    writeData(WISHES_FILE, wishes);
  }

  console.log(`[BACKEND] New RSVP received from: ${newRsvp.name} (${newRsvp.attend})`);
  res.status(201).json({ success: true, rsvp: newRsvp });
});

// Serve static production build files from 'dist'
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

// Start Express Server
app.listen(PORT, () => {
  console.log(`
═════════════════════════════════════════════════════════
  💒 WEDDING EXPRESS BACKEND SERVER RUNNING
  📍 Port: http://localhost:${PORT}
  👨‍💻 Developed by: Ganesh Charan Peddada
  ✨ Project: Hari Chandana & Veera Harsha Vardhan Wedding
═════════════════════════════════════════════════════════
  `);
});
