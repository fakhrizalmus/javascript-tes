const { checklist } = require("../models");
const model = require("../models");

const getAllChecklist = async (req, res) => {
  let { page, row } = req.query;
  page -= 1;
  const options = {
    attributes: ["id", "namaChecklist"],
    include: [
      {
        model: model.item,
        attributes: ["namaItem", "status"],
      },
    ],
  };
  if (page) options.offset = page;
  if (row) options.limit = row;
  const allChecklist = await checklist.findAll(options);
  // console.log(allChecklit);
  res.status(200).json({
    status: "Success",
    data: allChecklist,
  });
  if (!allChecklist) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

const getChecklistById = async (req, res) => {
  const options = {
    attributes: ["id", "namaChecklist"],
    include: [
      {
        model: model.item,
        attributes: ["namaItem", "status"],
      },
    ],
  };
  const { id } = req.params;
  const cariChecklist = await checklist.findByPk(id, options);
  if (cariChecklist) {
    return res.status(200).json({
      status: "Success",
      data: cariChecklist,
    });
  } else {
    return res.status(400).json({
      status: "Error",
      message: `Checklist dengan id ${req.params.id} tidak ditemukan`,
    });
  }
};

const createChecklist = async (req, res) => {
  const { namaChecklist } = req.body;
  const checklistData = {
    namaChecklist: namaChecklist
  };
  const tambahChecklist = await checklist.create(checklistData);
  res.status(200).json({
    status: "Success",
    data: checklistData,
  });
};

const deleteChecklist = async (req, res) => {
  const { id } = req.params;
  console.log("ini cari".id);
  const cariChecklist = await checklist.findByPk(id);
  if (!cariChecklist) {
    return res.status(400).json({
      status: "Error",
      message: `Checklist dengan id ${req.params.id} tidak ditemukan`,
    });
  }
  if (cariChecklist) {
    const hapusChecklist = await cariChecklist.destroy();
    return res.status(200).json({
      status: "Success",
      message: `Checklist dengan id ${req.params.id} berhasil dihapus`,
    });
  }
};

const updateChecklist = async (req, res) => {
  const { id } = req.params;
  const { namaChecklist } = req.body;
  const cariChecklist = await checklist.findOne({
    where: {
      id,
    },
  });
  if (!cariChecklist) {
    res.status(400).json({
      status: "error",
      message: `Checklist dengan id ${req.params.id} tidak ditemukan`,
    });
  }
    if (namaChecklist) {
      cariChecklist.namaChecklist = namaChecklist;
    }
  const updateChecklist = await cariChecklist.save();
  if (updateChecklist) {
    res.status(200).json({
      status: "success",
      data: updateChecklist,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  getAllChecklist,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
};
