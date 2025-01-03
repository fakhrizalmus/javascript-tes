const { user } = require("../models");
const model = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const { JWT_SECRET } = process.env;

const getAllUser = async (req, res) => {
  let { page, row } = req.query;
  page -= 1;
  const options = {
    attributes: ["id", "username"],
    include: [
      {
        model: model.blog,
        attributes: ["judul", "isi"],
      },
      {
        model: model.komen,
        attributes: ["komen"],
      },
    ],
  };
  if (page) options.offset = page;
  if (row) options.limit = row;
  const allUser = await user.findAll(options);
  // console.log(allUser);
  res.status(200).json({
    status: "Success",
    data: allUser,
  });
  if (!allUser) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

const getUserById = async (req, res) => {
  const options = {
    attributes: ["id", "username"],
    include: [
      {
        model: model.blog,
        attributes: ["judul", "isi"],
      },
      {
        model: model.komen,
        attributes: ["komen"],
      },
    ],
  };
  const { id } = req.params;
  const cariUser = await user.findByPk(id, options);
  if (cariUser) {
    return res.status(200).json({
      status: "Success",
      data: cariUser,
    });
  } else {
    return res.status(400).json({
      status: "Error",
      message: `User dengan id ${req.params.id} tidak ditemukan`,
    });
  }
};

const postUser = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
  };
  const tambahUser = await user.create(userData);
  res.status(200).json({
    status: "Success",
    data: userData,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const foundPassword = await user.findOne({
    where: {
      username: username,
    },
  });
  const validasi = bcrypt.compareSync(password, foundPassword.password);
  // console.log(validasi);
  if (validasi) {
    const userData = {
      id: foundPassword.id,
      username: foundPassword.username,
    };
    var token = jwt.sign(userData, "secret", { expiresIn: "12h" });
    return res.status(201).json({
      Token: token,
    });
  }
  return res.status(400).json({
    status: "Tidak terdaftar",
    message: "Coba lagi",
  });
};

const register = async (req, res) => {
  const { email, username, password, namaLengkap } = req.body;
  const userData = {
    email: email,
    username: username,
    password: password,
    namaLengkap: namaLengkap
  };
  const foundName = await user.findOne({
    where: {
      username: req.body.username,
    },
  });
  const foundEmail = await user.findOne({
    where: {
      email: req.body.email,
    },
  });  
  const cekHurufKecil = req.body.password.match(/[a-z]/g);
  const cekHurufBesar = req.body.password.match(/[A-Z]/g);
  const cekAngka = req.body.password.match(/[0-9]/g);
  const cekAwal = req.body.password.charAt(0)  
  if (!cekHurufKecil) {
    return res.status(400).json({
      status: "Error",
      message: "Password harus ada huruf kecil",
    });
  }
  if (!cekHurufBesar) {
    return res.status(400).json({
      status: "Error",
      message: "Password harus ada huruf besar",
    });
  }
  if (!cekAngka) {
    return res.status(400).json({
      status: "Error",
      message: "Password harus angka",
    });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({
      status: "Error",
      message: "Password harus minimal 8 karakter",
    });
  }
  if (req.body.password.length > 32) {
    return res.status(400).json({
      status: "Error",
      message: "Password harus maksimal 32 karakter",
    });
  }  
  if (cekAwal == Number) {
    return res.status(400).json({
      status: "Error",
      message: "Karakter awal tidak boleh angka",
    });
  }
  if (foundEmail && foundName) {
    return res.status(400).json({
      status: "Error",
      message: "Nama dan email sudah terpakai",
    });
  }
  if (foundName) {
    return res.status(400).json({
      status: "Error",
      message: "Nama sudah terpakai",
    });
  }
  if (foundEmail) {
    return res.status(400).json({
      status: "Error",
      message: "Email sudah terpakai",
    });
  }
  if (!foundName && !foundEmail) {
    const tambahUser = await user.create(userData);
    return res.status(200).json({
      status: "Success",
      message: "Berhasil mendaftar",
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
  }
};

module.exports = {
  getAllUser,
  postUser,
  login,
  register,
  getUserById,
};
