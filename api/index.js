import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS with explicit options
app.use(cors({
  origin: true, // Reflect the request origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' })); // Increase limit for image uploads

const { Pool } = pg;

// Add check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL environment variable is missing!');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // return an error after 10 seconds if connection could not be established
});

// Add error handler for idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Do not exit, let the pool reconnect
});

// Middleware to normalize paths for Vercel
app.use((req, res, next) => {
  // If request URL starts with /api but is not matched, try stripping /api
  // This helps if Vercel passes full path but routes are defined without /api
  // But here we define routes WITH /api so it should be fine.
  // However, let's log the path for debugging (in server logs)
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to database at:', res.rows[0].now);
  }
});

// Health Check
app.get(['/api/health', '/health'], (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    dbConfigured: !!process.env.DATABASE_URL
  });
});

// Root route for sanity check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Packages Routes

// GET all packages
app.get(['/api/packages', '/packages'], async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        title, 
        price, 
        pax, 
        vehicle, 
        organizer, 
        image, 
        description, 
        locations, 
        vehicle_options as "vehicleOptions",
        created_at as "createdAt"
      FROM packages 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new package
app.post(['/api/packages', '/packages'], async (req, res) => {
  const { title, price, pax, vehicle, organizer, image, description, locations, vehicleOptions } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO packages (title, price, pax, vehicle, organizer, image, description, locations, vehicle_options) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING 
        id, 
        title, 
        price, 
        pax, 
        vehicle, 
        organizer, 
        image, 
        description, 
        locations, 
        vehicle_options as "vehicleOptions",
        created_at as "createdAt"`,
      [title, price, pax, vehicle, organizer, image, description, locations, JSON.stringify(vehicleOptions)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update package
app.put(['/api/packages/:id', '/packages/:id'], async (req, res) => {
  const { id } = req.params;
  const { title, price, pax, vehicle, organizer, image, description, locations, vehicleOptions } = req.body;
  try {
    const result = await pool.query(
      `UPDATE packages 
       SET title = $1, price = $2, pax = $3, vehicle = $4, organizer = $5, image = $6, description = $7, locations = $8, vehicle_options = $9
       WHERE id = $10
       RETURNING 
        id, 
        title, 
        price, 
        pax, 
        vehicle, 
        organizer, 
        image, 
        description, 
        locations, 
        vehicle_options as "vehicleOptions",
        created_at as "createdAt"`,
      [title, price, pax, vehicle, organizer, image, description, locations, JSON.stringify(vehicleOptions), id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE package
app.delete(['/api/packages/:id', '/packages/:id'], async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM packages WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cars Routes

// GET all cars
app.get(['/api/cars', '/cars'], async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        brand, 
        model, 
        year, 
        image, 
        price::numeric::float8 as price, 
        transmission, 
        fuel_type as "fuelType", 
        seats, 
        category, 
        rating::numeric::float8 as rating, 
        reviews_count as "reviews", 
        status, 
        features, 
        price_per_km::numeric::float8 as "pricePerKm", 
        slab_price_0_100::numeric::float8 as "slabPrice0to100", 
        slab_price_100_200::numeric::float8 as "slabPrice100to200", 
        slab_price_200_300::numeric::float8 as "slabPrice200to300",
        created_at as "createdAt"
      FROM cars 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new car
app.post(['/api/cars', '/cars'], async (req, res) => {
  const { name, brand, model, year, image, price, transmission, fuelType, seats, category, rating, reviews, status, features, pricePerKm, slabPrice0to100, slabPrice100to200, slabPrice200to300 } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO cars (name, brand, model, year, image, price, transmission, fuel_type, seats, category, rating, reviews_count, status, features, price_per_km, slab_price_0_100, slab_price_100_200, slab_price_200_300) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
       RETURNING 
        id, 
        name, 
        brand, 
        model, 
        year, 
        image, 
        price::numeric::float8 as price, 
        transmission, 
        fuel_type as "fuelType", 
        seats, 
        category, 
        rating::numeric::float8 as rating, 
        reviews_count as "reviews", 
        status, 
        features, 
        price_per_km::numeric::float8 as "pricePerKm", 
        slab_price_0_100::numeric::float8 as "slabPrice0to100", 
        slab_price_100_200::numeric::float8 as "slabPrice100to200", 
        slab_price_200_300::numeric::float8 as "slabPrice200to300",
        created_at as "createdAt"`,
      [name, brand, model, year, image, price, transmission, fuelType, seats, category, rating || 0, reviews || 0, status || 'Available', features, pricePerKm, slabPrice0to100, slabPrice100to200, slabPrice200to300]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update car
app.put(['/api/cars/:id', '/cars/:id'], async (req, res) => {
  const { id } = req.params;
  const { name, brand, model, year, image, price, transmission, fuelType, seats, category, rating, reviews, status, features, pricePerKm, slabPrice0to100, slabPrice100to200, slabPrice200to300 } = req.body;
  try {
    const result = await pool.query(
      `UPDATE cars 
       SET name = $1, brand = $2, model = $3, year = $4, image = $5, price = $6, transmission = $7, fuel_type = $8, 
        seats = $9, category = $10, rating = $11, reviews_count = $12, status = $13, features = $14,
        price_per_km = $15, slab_price_0_100 = $16, slab_price_100_200 = $17, slab_price_200_300 = $18
       WHERE id = $19
       RETURNING 
        id, 
        name, 
        brand, 
        model, 
        year, 
        image, 
        price::numeric::float8 as price, 
        transmission, 
        fuel_type as "fuelType", 
        seats, 
        category, 
        rating::numeric::float8 as rating, 
        reviews_count as "reviews", 
        status, 
        features, 
        price_per_km::numeric::float8 as "pricePerKm", 
        slab_price_0_100::numeric::float8 as "slabPrice0to100", 
        slab_price_100_200::numeric::float8 as "slabPrice100to200", 
        slab_price_200_300::numeric::float8 as "slabPrice200to300",
        created_at as "createdAt"`,
      [name, brand, model, year, image, price, transmission, fuelType, seats, category, rating, reviews, status, features, pricePerKm, slabPrice0to100, slabPrice100to200, slabPrice200to300, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE car
app.delete(['/api/cars/:id', '/cars/:id'], async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Testimonials Routes

// GET all testimonials
app.get(['/api/testimonials', '/testimonials'], async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new testimonial
app.post(['/api/testimonials', '/testimonials'], async (req, res) => {
  const { name, rating, text, avatar } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO testimonials (name, rating, text, avatar) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, rating, text, avatar]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update testimonial
app.put(['/api/testimonials/:id', '/testimonials/:id'], async (req, res) => {
  const { id } = req.params;
  const { name, rating, text, avatar } = req.body;
  try {
    const result = await pool.query(
      `UPDATE testimonials 
       SET name = $1, rating = $2, text = $3, avatar = $4
       WHERE id = $5
       RETURNING *`,
      [name, rating, text, avatar, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE testimonial
app.delete(['/api/testimonials/:id', '/testimonials/:id'], async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Users Routes

// Sync user from Clerk
app.post(['/api/users/sync', '/users/sync'], async (req, res) => {
  const { name, email, phone, role } = req.body;
  console.log('Syncing user:', { name, email, phone, role });
  try {
    // Check if user exists
    const checkRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (checkRes.rows.length > 0) {
      // Update existing user
      console.log('Updating existing user:', email);
      const updateRes = await pool.query(
        `UPDATE users SET name = $1, phone = $2, role = $3 WHERE email = $4 RETURNING *`,
        [name, phone, role || 'user', email]
      );
      res.json(updateRes.rows[0]);
    } else {
      // Create new user
      console.log('Creating new user:', email);
      const insertRes = await pool.query(
        `INSERT INTO users (name, email, phone, role) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, phone, role || 'user']
      );
      res.json(insertRes.rows[0]);
    }
  } catch (err) {
    console.error('Error syncing user:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET all users (for admin)
app.get(['/api/users', '/users'], async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
