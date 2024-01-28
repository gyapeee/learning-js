"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _axios = _interopRequireDefault(require("axios"));
var _reactPlayer = _interopRequireDefault(require("react-player"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // A frontend fájl (index.js)
// Importáljuk a szükséges modulokat
// A React keretrendszer
// A React DOM kezelő
// A HTTP kérések küldésére
// A videó lejátszására

// Létrehozzuk a frontend alkalmazást
function App() {
  // Definiáljuk a szerver URL-jét
  var serverUrl = 'http://localhost:3000';

  // Definiáljuk a state változókat
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    posts = _useState2[0],
    setPosts = _useState2[1]; // A blog bejegyzések listája
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    title = _useState4[0],
    setTitle = _useState4[1]; // Az új vagy módosított bejegyzés címe
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    content = _useState6[0],
    setContent = _useState6[1]; // Az új vagy módosított bejegyzés tartalma
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    author = _useState8[0],
    setAuthor = _useState8[1]; // Az új vagy módosított bejegyzés szerzője
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    image = _useState10[0],
    setImage = _useState10[1]; // Az új vagy módosított bejegyzés kép URL-je
  var _useState11 = (0, _react.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    video = _useState12[0],
    setVideo = _useState12[1]; // Az új vagy módosított bejegyzés videó URL-je
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    editId = _useState14[0],
    setEditId = _useState14[1]; // Az éppen módosított bejegyzés id-je

  // Definiáljuk a hatásokat
  (0, _react.useEffect)(function () {
    // Betöltjük az összes bejegyzést a szerverről
    _axios["default"].get("".concat(serverUrl, "/posts")).then(function (res) {
      // Ha sikeres volt a kérés, akkor frissítjük a bejegyzések listáját
      setPosts(res.data);
    })["catch"](function (err) {
      // Ha hiba történt, akkor kiírjuk a konzolra
      console.error(err);
    });
  }, []); // Üres tömböt adunk meg, hogy csak egyszer fusson le a hatás

  // Definiáljuk a segédfüggvényeket

  // Egy függvény, ami kezeli a beviteli mezők változását
  var handleChange = function handleChange(e) {
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
  var handleSubmit = function handleSubmit(e) {
    // Megakadályozzuk az alapértelmezett form küldést
    e.preventDefault();

    // Ellenőrizzük, hogy van-e cím, tartalom és szerző megadva
    if (title && content && author) {
      // Létrehozunk egy új bejegyzést a state változókból
      var newPost = {
        title: title,
        content: content,
        author: author,
        date: new Date(),
        // Az aktuális dátumot adjuk meg
        image: image,
        video: video
      };

      // Elküldjük a bejegyzést a szervernek
      _axios["default"].post("".concat(serverUrl, "/posts"), newPost).then(function (res) {
        // Ha sikeres volt a kérés, akkor hozzáadjuk a bejegyzést a listához
        setPosts([].concat(_toConsumableArray(posts), [res.data]));

        // Töröljük a beviteli mezők tartalmát
        setTitle('');
        setContent('');
        setAuthor('');
        setImage('');
        setVideo('');
      })["catch"](function (err) {
        // Ha hiba történt, akkor kiírjuk a konzolra
        console.error(err);
      });
    } else {
      // Ha nincs megadva valamelyik kötelező mező, akkor figyelmeztetjük a felhasználót
      alert('Kérlek, add meg a címet, a tartalmat és a szerzőt!');
    }
  };

  // Egy függvény, ami kezeli a bejegyzés szerkesztését
  var handleEdit = function handleEdit(id) {
    // Megkeressük a bejegyzést a listában az id alapján
    var post = posts.find(function (p) {
      return p._id === id;
    });

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
  var handleUpdate = function handleUpdate(e) {
    // Megakadályozzuk az alapértelmezett form küldést
    e.preventDefault();

    // Ellenőrizzük, hogy van-e editId megadva
    if (editId) {
      // Létrehozunk egy módosított bejegyzés objektumot a state változókból
      var updatedPost = {
        title: title,
        content: content,
        author: author,
        date: new Date(),
        // Az aktuális dátumot adjuk meg
        image: image,
        video: video
      };

      // Elküldjük a módosított bejegyzést a szervernek
      _axios["default"].put("".concat(serverUrl, "/posts/").concat(editId), updatedPost).then(function (res) {
        // Ha sikeres volt a kérés, akkor frissítjük a bejegyzést a listában
        setPosts(posts.map(function (p) {
          return p._id === editId ? res.data : p;
        }));

        // Töröljük a beviteli mezők tartalmát
        setTitle('');
        setContent('');
        setAuthor('');
        setImage('');
        setVideo('');

        // Töröljük az editId-t
        setEditId(null);
      })["catch"](function (err) {
        // Ha hiba történt, akkor kiírjuk a konzolra
        console.error(err);
      });
    } else {
      // Ha nincs editId megadva, akkor figyelmeztetjük a felhasználót
      alert('Nincs kiválasztva bejegyzés a szerkesztéshez!');
    }
  };

  // Egy függvény, ami kezeli a bejegyzés törlését
  var handleDelete = function handleDelete(id) {
    // Megkérdezzük a felhasználót, hogy biztosan törölni akarja-e a bejegyzést
    if (window.confirm('Biztosan törölni akarod ezt a bejegyzést?')) {
      // Ha igen, akkor elküldjük a törlési kérést a szervernek
      _axios["default"]["delete"]("".concat(serverUrl, "/posts/").concat(id)).then(function (res) {
        // Ha sikeres volt a kérés, akkor eltávolítjuk a bejegyzést a listából
        setPosts(posts.filter(function (p) {
          return p._id !== id;
        }));
      })["catch"](function (err) {
        // Ha hiba történt, akkor kiírjuk a konzolra
        console.error(err);
      });
    }
  };

  // Visszatérünk a JSX kóddal, ami megjeleníti az alkalmazást
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Blog rendszer"), /*#__PURE__*/_react["default"].createElement("h2", null, "\xDAj bejegyz\xE9s l\xE9trehoz\xE1sa vagy szerkeszt\xE9se"), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: editId ? handleUpdate : handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "title"
  }, "C\xEDm:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "title",
    name: "title",
    value: title,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "content"
  }, "Tartalom:"), /*#__PURE__*/_react["default"].createElement("textarea", {
    id: "content",
    name: "content",
    value: content,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "author"
  }, "Szerz\u0151:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "author",
    name: "author",
    value: author,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "image"
  }, "K\xE9p URL:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "image",
    name: "image",
    value: image,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "video"
  }, "Vide\xF3 URL:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "video",
    name: "video",
    value: video,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("input", {
    type: "submit",
    value: editId ? "Módosít" : "Létrehoz"
  })), /*#__PURE__*/_react["default"].createElement("h2", null, "Bejegyz\xE9sek list\xE1ja"), /*#__PURE__*/_react["default"].createElement("ul", null, posts.map(function (post) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: post._id
    }, /*#__PURE__*/_react["default"].createElement("h3", null, post.title), /*#__PURE__*/_react["default"].createElement("p", null, post.content), /*#__PURE__*/_react["default"].createElement("p", null, "Szerz\u0151: ", post.author), /*#__PURE__*/_react["default"].createElement("p", null, "D\xE1tum: ", post.date), post.image && /*#__PURE__*/_react["default"].createElement("img", {
      src: post.image,
      alt: "Bejegyz\xE9s k\xE9pe"
    }), post.video && /*#__PURE__*/_react["default"].createElement(_reactPlayer["default"], {
      url: post.video
    }), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleEdit(post._id);
      }
    }, "Szerkeszt"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleDelete(post._id);
      }
    }, "T\xF6r\xF6l"));
  })));
}

// Megjelenítjük az alkalmazást a böngészőben
_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(App, null), document.getElementById('root'));
