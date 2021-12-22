const Record = require("../models/Record");
const User = require("../models/User");
const Person = require("../models/Person");
const CustomErrorHandler = require("../services/CustomErrorHandler");

module.exports = {
  create: async (req, res, next) => {
    const record = new Record({
      type: req.body.type,
      vaccine: req.body.vaccine,
      majorId: req.body.majorId,
      location: req.body.location,
      person: req.body.person,
      expert: req.user._id,
    });

    const savedRecord = await record.save();
    return res.status(200).json(savedRecord);
  },

  delete: async (req, res, next) => {
    const record = await Record.findById(req.params.id);

    if (!record) return next(CustomErrorHandler.notFound("Record not found"));
    const user = await User.findOne({ _id: req.body.userId });

    if (user) {
      if (user.isExpert) {
        await record.remove();
        return res.status(200).json({ message: "Record deleted successfully" });
      } else {
        return next(
          CustomErrorHandler.unAuthorized(
            "You are not authorized to delete this record"
          )
        );
      }
    } else {
      return CustomErrorHandler.unAuthorized(
        "You are not authorized to delete this record"
      );
    }
  },

  // Get all the records
  getAllRecords: async (req, res, next) => {
    const records = await Record.find().select("-_v");
    res.status(200).json(records);
  },

  getRecordsByExpert: async (req, res, next) => {
    const expert = await User.findById({ _id: req.params.expertId });

    console.log(expert);
    if (expert.isExpert || expert.person == req.params.expertId) {
      const records = await Record.find({ expert: expert._id });
      return res.status(200).json(records);
    }

    res
      .status(400)
      .json({ message: "You must be a health professional to view records" });
  },

  getRecordsOfPerson: async (req, res, next) => {
    const records = await Record.find({ person: req.body.person });

    res.status(200).json(records);
  },

  getRecordByMajorId: async (req, res, next) => {
    console.log(req.params);
    const person = await Person.findOne({ majorId: req.params.majorId });
    console.log(person);
    const record = await Record.findOne({ person: person._id });
    console.log(record);

    res.status(200).json(record);
  },

  ensureVaccine: async (req, res, next) => {
    const person = await Person.findById(req.params.personId);
    person.isVaccinated = true;

    await person.save();
    res.status(200).json("Vaccinated Successfully");
  },
};
