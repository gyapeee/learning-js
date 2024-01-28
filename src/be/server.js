// A szerver fájl (server.js)

// Importáljuk a szükséges modulokat
const express = require('express'); // A webes keretrendszer
const mongoose = require('mongoose'); // Az adatbázis-kezelő
const cors = require('cors'); // A kereszt-domain kérések engedélyezése
// Importáljuk a szükséges modulokat
const https = require('node:tls'); // Az SSL/TLS protokoll modulja
const fs = require('node:fs'); // A fájlrendszer modulja

// Létrehozzuk az express alkalmazást
const app = express();

// Beállítjuk a portot, amelyen a szerver hallgat
const port = process.env.PORT || 3000;

// Csatlakozunk a MongoDB adatbázishoz
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});

// Létrehozzuk a blog bejegyzés sémát
const PostSchema = new mongoose.Schema({
  title: String, // A bejegyzés címe
  content: String, // A bejegyzés tartalma
  author: String, // A bejegyzés szerzője
  date: Date, // A bejegyzés dátuma
  image: String, // A bejegyzéshez tartozó kép URL-je
  video: String // A bejegyzéshez tartozó videó URL-je
});

// Létrehozzuk a blog bejegyzés modellt
const Post = mongoose.model('Post', PostSchema);

// Engedélyezzük a kereszt-domain kéréseket
app.use(cors());

// Engedélyezzük a JSON formátumú adatok fogadását
app.use(express.json());

// Definiáljuk a REST API végpontokat

// GET /posts - visszaadja az összes blog bejegyzést
app.get('/posts', (req, res) => {
  // Lekérdezzük az összes bejegyzést az adatbázisból
  Post.find({}, (err, posts) => {
    if (err) {
      // Ha hiba történt, akkor visszaküldjük a hibaüzenetet
      console.log("Error: " +err);
      res.status(500).send(err);
    } else {
      // Ha nem volt hiba, akkor visszaküldjük a bejegyzéseket
      res.status(200).send(posts);
    }
  });
});

// POST /posts - létrehoz egy új blog bejegyzést
app.post('/posts', (req, res) => {
  // Létrehozunk egy új bejegyzést a kérésben kapott adatokkal
  const post = new Post(req.body);

  console.log(body);

  // Elmentjük a bejegyzést az adatbázisba
  post.save((err, post) => {
    if (err) {
      // Ha hiba történt, akkor visszaküldjük a hibaüzenetet
      res.status(500).send(err);
    } else {
      // Ha nem volt hiba, akkor visszaküldjük a létrehozott bejegyzést
      res.status(201).send(post);
    }
  });
});

// PUT /posts/:id - módosít egy létező blog bejegyzést
app.put('/posts/:id', (req, res) => {
  // Megkeressük a bejegyzést az adatbázisban az id alapján
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      // Ha hiba történt, akkor visszaküldjük a hibaüzenetet
      res.status(500).send(err);
    } else {
      // Ha megtaláltuk a bejegyzést, akkor frissítjük az adatait a kérésben kapott adatokkal
      post.title = req.body.title;
      post.content = req.body.content;
      post.author = req.body.author;
      post.date = req.body.date;
      post.image = req.body.image;
      post.video = req.body.video;

      // Elmentjük a módosított bejegyzést az adatbázisba
      post.save((err, post) => {
        if (err) {
          // Ha hiba történt, akkor visszaküldjük a hibaüzenetet
          res.status(500).send(err);
        } else {
          // Ha nem volt hiba, akkor visszaküldjük a módosított bejegyzést
          res.status(200).send(post);
        }
      });
    }
  });
});

// DELETE /posts/:id - töröl egy létező blog bejegyzést
app.delete('/posts/:id', (req, res) => {
  // Megkeressük és töröljük a bejegyzést az adatbázisból az id alapján
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      // Ha hiba történt, akkor visszaküldjük a hibaüzenetet
      res.status(500).send(err);
    } else {
      // Ha nem volt hiba, akkor visszaküldjük a törölt bejegyzést
      res.status(200).send(post);
    }
  });
});

// Olvassuk be a tanúsítványt és a kulcsot
// const options = {
//   key: fs.readFileSync('ssl/server.key'),
//   cert: fs.readFileSync('ssl/server.crt')
// };

// Létrehozzuk az HTTPS szervert
const server = https.createServer(app);//options/, app);

// Indítjuk a szervert a megadott porton
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
