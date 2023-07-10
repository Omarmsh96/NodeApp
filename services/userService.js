const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const ErrorApi = require('../middleware/ErrorApi');

exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (!user) {
    res.status(404).json({ message: `No user found for this id ${id}` });
  }
  res.status(200).json({ data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userModel.deleteOne({ _id: id });
  if (!user) {
    res.status(404).json({ message: `No user found for this id ${id}` });
  }
  res.status(204).send();
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );
  if (!document) {
    return next(new ErrorApi(`No user found for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    { new: true }
  );
  if (!user) {
    return next(new ErrorApi(`No user found for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userModel.create({ email, password, name });
  res.status(201).json({ data: user });
});