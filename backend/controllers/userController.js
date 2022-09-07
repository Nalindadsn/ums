import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });
  // res.json({
  //   name: user,
  // });
  if (user && (await user.matchPassword(password))) {
    if (user.userType !== 'admin') {
      res.status(401);
      throw new Error('You are not an admin');
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      userId: user.userId,
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    pic,
    userId,
    nic,
    dob,
    phone,
    gender,
    maritalStatus,
    userType,
  } = req.body;

  const userExistsC = await User.findOne({ userId });

  if (userExistsC) {
    res.status(404);
    throw new Error('User ID already exists');
  }
  const userExistsB = await User.findOne({ nic });

  if (userExistsB) {
    res.status(404);
    throw new Error('NIC already exists');
  }
  const userExistsA = await User.findOne({ email });

  if (userExistsA) {
    res.status(404);
    throw new Error('Email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    userId,
    nic,
    dob,
    phone,
    gender,
    maritalStatus,
    userType,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const notes = await User.find();
  res.json(notes);
});
const getUsersAdmin = asyncHandler(async (req, res) => {
  const notes = await User.find({ userType: 'admin' });
  res.json(notes);
});
const getUsersCustomer = asyncHandler(async (req, res) => {
  const notes = await User.find({ userType: 'customer' });
  res.json(notes);
});
const getUsersBoatOwner = asyncHandler(async (req, res) => {
  const notes = await User.find({ userType: 'boatOwner' });
  res.json(notes);
});
const getUsersinventoryManager = asyncHandler(async (req, res) => {
  const notes = await User.find({ userType: 'inventoryManager' });
  res.json(notes);
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});
const updateUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    userId,
    nic,
    dob,
    gender,
    MaritalStatus,
    phone,
    userType,
  } = req.body;
  // const userExistsC = await User.findOne({ userId });

  // if (userExistsC) {
  //   res.status(404);
  //   throw new Error('User ID already exists');
  // }

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name;
    user.email = email;
    user.userId = userId;
    user.nic = nic;
    user.dob = dob;
    user.gender = gender;
    user.MaritalStatus = MaritalStatus;
    user.phone = phone;
    user.userType = userType;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  updateUserProfile,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  getUsersAdmin,
  getUsersCustomer,
  getUsersBoatOwner,
  getUsersinventoryManager,
};
