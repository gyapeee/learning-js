// A frontend fájl (index.js)

// Importáljuk a szükséges modulokat
import React, {useState, useEffect} from 'react'; // A React keretrendszer
import ReactDOM from 'react-dom'; // A React DOM kezelő
import axios from 'axios'; // A HTTP kérések küldésére
import ReactPlayer from 'react-player'; // A videó lejátszására

// Létrehozzuk a frontend alkalmazást
function App() {
  // Definiáljuk a szerver URL-jét
  const serverUrl = 'http://localhost:3000';

  // Definiáljuk a state változókat
  const [posts, setPosts] = useState([]); // A blog bejegyzések listája
  const [title, setTitle] = useState(''); // Az új vagy módosított bejegyzés címe
  const [content, setContent] = useState(''); // Az új vagy módosított bejegyzés tartalma
  const [author, setAuthor] = useState(''); // Az új vagy módosított bejegyzés szerzője
  const [image, setImage] = useState(''); // Az új vagy módosított bejegyzés kép URL-je
  const [video, setVideo] = useState(''); // Az új vagy módosított bejegyzés videó URL-je
  const [editId, setEditId] = useState(null); // Az éppen módosított bejegyzés id-je

  // Definiáljuk a hatásokat
  useEffect(() => {
    // Betöltjük az összes bejegyzést a szerverről
    axios.get(`${serverUrl}/posts`)
      .then(res => {
        // Ha sikeres volt a kérés, akkor frissítjük a bejegyzések listáját
        setPosts(res.data);
      })
      .catch(err => {
        // Ha hiba történt, akkor kiírjuk a konzolra
        console.error(err);
      });
  }, []); // Üres tömböt adunk meg, hogy csak egyszer fusson le a hatás

  // Definiáljuk a segédfüggvényeket

  // Egy függvény, ami kezeli a beviteli mezők változását
  const handleChange = (e) => {
    // Megnézzük, hogy melyik mező változott, és frissítjük a megfelelő state változót
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
        setContent(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'image':
        setImage(e.target.value);
        break;
      case 'video':
        setVideo(e.target.value);
        break;
      default:
        break;
    }
  };

  // Egy függvény, ami kezeli az új bejegyzés létrehozását
  const handleSubmit = (e) => {
    // Megakadályozzuk az alapértelmezett form küldést
    e.preventDefault();

    // Ellenőrizzük, hogy van-e cím, tartalom és szerző megadva
    if (title && content && author) {
      // Létrehozunk egy új bejegyzést a state változókból
      const newPost = {
        title,
        content,
        author,
        date: new Date(), // Az aktuális dátumot adjuk meg
        image,
        video
      };

      // Elküldjük a bejegyzést a szervernek
      axios.post(`${serverUrl}/posts`, newPost)
        .then(res => {
          // Ha sikeres volt a kérés, akkor hozzáadjuk a bejegyzést a listához
          setPosts([...posts, res.data]);

          // Töröljük a beviteli mezők tartalmát
          setTitle('');
          setContent('');
          setAuthor('');
          setImage('');
          setVideo('');
        })
        .catch(err => {
          // Ha hiba történt, akkor kiírjuk a konzolra
          console.error(err);
        });
    } else {
      // Ha nincs megadva valamelyik kötelező mező, akkor figyelmeztetjük a felhasználót
      alert('Kérlek, add meg a címet, a tartalmat és a szerzőt!');
    }
  };

  // Egy függvény, ami kezeli a bejegyzés szerkesztését
  const handleEdit = (id) => {
    // Megkeressük a bejegyzést a listában az id alapján
    const post = posts.find(p => p._id === id);

    // Ha megtaláltuk, akkor beállítjuk a beviteli mezők értékét a bejegyzés adataival
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setImage(post.image);
      setVideo(post.video);

      // Beállítjuk az editId-t a bejegyzés id-jére
      setEditId(id);
    }
  };

  // Egy függvény, ami kezeli a bejegyzés módosítását
  const handleUpdate = (e) => {
    // Megakadályozzuk az alapértelmezett form küldést
    e.preventDefault();

    // Ellenőrizzük, hogy van-e editId megadva
    if (editId) {
      // Létrehozunk egy módosított bejegyzés objektumot a state változókból
      const updatedPost = {
        title,
        content,
        author,
        date: new Date(), // Az aktuális dátumot adjuk meg
        image,
        video
      };

      // Elküldjük a módosított bejegyzést a szervernek
      axios.put(`${serverUrl}/posts/${editId}`, updatedPost)
        .then(res => {
          // Ha sikeres volt a kérés, akkor frissítjük a bejegyzést a listában
          setPosts(posts.map(p => p._id === editId ? res.data : p));

          // Töröljük a beviteli mezők tartalmát
          setTitle('');
          setContent('');
          setAuthor('');
          setImage('');
          setVideo('');

          // Töröljük az editId-t
          setEditId(null);
        })
        .catch(err => {
          // Ha hiba történt, akkor kiírjuk a konzolra
          console.error(err);
        });
    } else {
      // Ha nincs editId megadva, akkor figyelmeztetjük a felhasználót
      alert('Nincs kiválasztva bejegyzés a szerkesztéshez!');
    }
  };

  // Egy függvény, ami kezeli a bejegyzés törlését
  const handleDelete = (id) => {
    // Megkérdezzük a felhasználót, hogy biztosan törölni akarja-e a bejegyzést
    if (window.confirm('Biztosan törölni akarod ezt a bejegyzést?')) {
      // Ha igen, akkor elküldjük a törlési kérést a szervernek
      axios.delete(`${serverUrl}/posts/${id}`)
        .then(res => {
          // Ha sikeres volt a kérés, akkor eltávolítjuk a bejegyzést a listából
          setPosts(posts.filter(p => p._id !== id));
        })
        .catch(err => {
          // Ha hiba történt, akkor kiírjuk a konzolra
          console.error(err);
        });
    }
  };

  // Visszatérünk a JSX kóddal, ami megjeleníti az alkalmazást
  return (
    <div className="App">
      <h1>Blog rendszer</h1>
      <h2>Új bejegyzés létrehozása vagy szerkesztése</h2>
      <form onSubmit={editId ? handleUpdate : handleSubmit}>
        <label htmlFor="title">Cím:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleChange}/>
        <label htmlFor="content">Tartalom:</label>
        <textarea id="content" name="content" value={content} onChange={handleChange}></textarea><br/><br/>
        <label htmlFor="author">Szerző:</label>
        <input type="text" id="author" name="author" value={author} onChange={handleChange}/><br/><br/>
        <label htmlFor="image">Kép URL:</label>
        <input type="text" id="image" name="image" value={image} onChange={handleChange}/><br/><br/>
        <label htmlFor="video">Videó URL:</label>
        <input type="text" id="video" name="video" value={video} onChange={handleChange}/><br/><br/>
        <input type="submit" value={editId ? "Módosít" : "Létrehoz"}/>
      </form>
        <h2>Bejegyzések listája</h2>
        <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Szerző: {post.author}</p>
            <p>Dátum: {post.date}</p>
            {post.image && <img src={post.image} alt="Bejegyzés képe" />}
            {post.video && <ReactPlayer url={post.video} />}
            <button onClick={() => handleEdit(post._id)}>Szerkeszt</button>
            <button onClick={() => handleDelete(post._id)}>Töröl</button>
          </li>
        ))}
        </ul>
        </div>
        );
}

// Megjelenítjük az alkalmazást a böngészőben
ReactDOM.render(<App />, document.getElementById('root'));
