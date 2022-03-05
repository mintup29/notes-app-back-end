const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

// agar web server dapat menyimpan catatan,
// ia perlu menyediakan route
const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },

  // menampilkan seluruh catatan yg disimpan pada server
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },

  // mendapatkan catatan secara spesifik, saat catatan diklik
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },

  // Untuk mengedit catatan yang disimpan
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },

  // untuk menghapus catatan yang disimpan
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

// ekspor nilainya
module.exports = routes;
