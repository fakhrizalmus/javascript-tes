const { item } = require("../models");
const model = require("../models");

const getAllItem = async (req, res) => {
  let { page, row } = req.query;
  page -= 1;
  const options = {
    attributes: ["id", "namaItem", "status", "checklistId"]
  };
  if (page) options.offset = page;
  if (row) options.limit = row;
  const allItem = await item.findAll(options);
  // console.log(allItem);
  res.status(200).json({
    status: "Success",
    data: allItem,
  });
  if (!allItem) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

const getItemById = async (req, res) => {
  const options = {
    attributes: ["id", "namaItem", "checklistId", "status"]
  };
  const { id } = req.params;
  const cariItem = await item.findByPk(id, options);
  if (cariItem) {
    return res.status(200).json({
      status: "Success",
      data: cariItem,
    });
  } else {
    return res.status(400).json({
      status: "Error",
      message: `Item dengan id ${req.params.id} tidak ditemukan`,
    });
  }
};

const createItem = async (req, res) => {
  const { namaItem, checklistId } = req.body;
  const itemData = {
    namaItem: namaItem,
    checklistId: checklistId
  };
  const tambahItem = await model.item.create(itemData);
  res.status(200).json({
    status: "Success",
    data: itemData,
  });
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const cariItem = await item.findByPk(id);
  if (!cariItem) {
    return res.status(400).json({
      status: "Error",
      message: `Item dengan id ${req.params.id} tidak ditemukan`,
    });
  }
  if (cariItem) {
    const hapusItem = await cariItem.destroy();
    return res.status(200).json({
      status: "Success",
      message: `Item dengan id ${req.params.id} berhasil dihapus`,
    });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { namaItem, status } = req.body;
  const cariItem = await model.item.findOne({
    where: {
      id,
    },
  });
  if (!cariItem) {
    res.status(400).json({
      status: "error",
      message: `Item dengan id ${req.params.id} tidak ditemukan`,
    });
  }
    if (status) {
      cariItem.status = status;
    }
    if (namaItem) {
      cariItem.namaItem = namaItem;
    }    
  const updateItem = await cariItem.save();
  if (updateItem) {
    res.status(200).json({
      status: "success",
      data: updateItem,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

const updateStatusItem = async (req, res) => {
  const { id } = req.params;
  const cariItem = await model.item.findOne({
    where: {
      id,
    },
  });
  if (!cariItem) {
    res.status(400).json({
      status: "error",
      message: `Item dengan id ${req.params.id} tidak ditemukan`,
    });
  }
  console.log(cariItem);
  
  cariItem.status = "done"   
  const updateItem = await cariItem.save();
  if (updateItem) {
    res.status(200).json({
      status: "success",
      data: updateItem,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  getAllItem,
  getItemById,
  createItem,
  deleteItem,
  updateItem,
  updateStatusItem
};
