const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const config = {
  user: 'qinm',
  password: 'Bill0714',
  server: 'golem.csse.rose-hulman.edu', 
  database: 'GalacticEmpireS3G2',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
// -- all getter Functions

app.get('/api/empires', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT top 6 * FROM Empire');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get('/api/planets', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT top 6 * FROM Planet');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);  
  }
});

app.get('/api/species', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT top 6 * FROM Species');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get('/api/technology', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT top 6 * FROM Technology');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Empire change:

// Insert Empire
app.post('/api/admin/insertEmpire', async (req, res) => {
  const { name, year, govId } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('Name', sql.NVarChar, name);
    request.input('FoundedYear', sql.Int, year);
    request.input('GovernmentID', sql.Int, govId);
    await request.execute('Insert_Empire');
    res.send('Empire inserted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Delete Empire
app.delete('/api/admin/deleteEmpire/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('EmpireID', sql.Int, id);
    await request.execute('Delete_Empire');
    res.send('Empire deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Update Empire
app.put('/api/admin/updateEmpire', async (req, res) => {
  const { id, name, year, govId } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('EmpireID', sql.Int, id);
    request.input('Name', sql.NVarChar, name);
    request.input('FoundedYear', sql.Int, year);
    request.input('GovernmentID', sql.Int, govId);
    await request.execute('Update_Empire');
    res.send('Empire updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//Technology Change:
// INSERT Technology
app.post('/api/admin/insertTechnology', async (req, res) => {
  const { name, description, type } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('Name', sql.NVarChar, name);
    request.input('Description', sql.NVarChar, description);
    request.input('Type', sql.NVarChar, type);
    await request.execute('Insert_Technology');
    res.send('Technology inserted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// DELETE Technology
app.delete('/api/admin/deleteTechnology/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('TechnologyID', sql.Int, id);
    await request.execute('Delete_Technology');
    res.send('Technology deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// UPDATE Technology
app.put('/api/admin/updateTechnology', async (req, res) => {
  const { id, name, description, type } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('TechnologyID', sql.Int, id);
    request.input('Name', sql.NVarChar, name);
    request.input('Description', sql.NVarChar, description);
    request.input('Type', sql.NVarChar, type);
    await request.execute('Update_Technology');
    res.send('Technology updated successfully');  
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
