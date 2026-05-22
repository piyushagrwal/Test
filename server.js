import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
        realtime: {
            transport: ws
        }
    }
    );

app.get('/', (req, res) => {
    console.log("Welcome");
    res.status(200).send("Welcome");
})

app.get('/users', async(req, res) => {
    const { data, error } = await supabase.from('Data')
        .select('id,name');
    res.status(200).json(data);
})


app.get('/users/:id', async(req, res) => {
  const id = req.params.id;
    const { data, error } = await supabase.from('Data')
        .select('id, name')
        .eq('id', id);
  if (!data || data.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(data);
});

app.post('/users', async(req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({message: "Name is required"})
    }
    const id = 2;
    const user = { id: id, name: name };
    // users.push(user);
    const { data, error } = await supabase.from('Data').insert([user]);
    res.status(201).json(user);
})


app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
