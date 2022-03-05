const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  // untuk menyimpan catatan dari client ke dalam array notes
  // client mengirim data catatan yang akan disimpan dalam bentuk JSON melalui body request menggunakan request.paylod
  const { title, tags, body } = request.payload;

  const id = nanoid(16); // library nanoid untuk mendapatkan nilai id unik
  const createdAt = new Date().toISOString(); // mendaptkan kapan data dibuat
  const updatedAt = createdAt;

  // memasukkan nilai ke dalam array notes menggunakan metode push()
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  // method filter() untuk mengetahui apakah newNote sudah masuk ke dalam array notes berdasarkan id catatan
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // menggunakan isSuccess untuk menentukan respons yang diberikan server, jika nilai true maka akan diberi respons
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// fungsi untuk menampilkan seluruh catatan yg disimpan pada server
// dan kembalikan data dengan nilai notes di dalamnya
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// fungsi untuk mendapatkan catatan secara spesifik, saat catatan diklik
// mengembalikan objek catatan scr spesifik berdasarkan id yg digunakan oleh path parameter
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params; // dapatkan dulu nilai id dari request.param

  // dapatkan objek note dengan id tsb dr objek array notes menggunakan method array filter()
  const note = notes.filter((n) => n.id === id)[0];

  // kembalikan fungsi handler dengan data beserta objek note di dalamnya.
  // Namun sebelum itu, pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Untuk mengedit catatan yang disimpan
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan nilai id-nya

  // dapatkan data notes terbaru yang dikirimkan oleh client melalui body request
  const { title, tags, body } = request.payload;

  // perbarui juga nilai dr properti updateAt
  const updateAt = new Date().toISOString();

  // mengubah catatan lama dengan yg baru dengan memanfaatkan indexing array
  // pertama, dapatkan dulu index array pd objek catatan sesuai id yg ditentukan
  const index = notes.findIndex((note) => note.id === id);

  // bila note dg id ditemukan, maka index akan bernilai array index dr objek catt yg dicari
  // namun, bila tdk ditemukan maka index bernilai -1
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  // Jika gagal
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Fungsi untuk menghapus catatan yang disimpan
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan nilai id-nya

  // Dapatkan dulu index array pd objek catatan sesuai id yg ditentukan
  const index = notes.findIndex((note) => note.id === id);

  // Lakukan pengecekan thd nilai index, pastikan nilainya tidak -1 bila hendak menghapus catata
  // untuk menghapus data pada array berdasarkan index, gunakan method array splice().
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  // bila index bernilai -1
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// ekspor lebih dari satu nilai
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
