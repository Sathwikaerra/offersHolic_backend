import express from 'express';
import {
  getUserFromToken,
  getAllUsers,

  getUserById,
  deleteUser,
  updateUserData,
  updateUserDataByAdmin,
  savePushToken,

} from '../../../controllers/user/userController.js';
import { authenticateAdmin, authenticateToken } from '../../../middlewares/auth/authMiddleware.js';
import { createAddress, deleteAddressById, getAddressById, getAllAddress, getCurrentUserAddresses, getSavedOffers, updateAddressById } from '../../../controllers/address/addressController.js';
// import addressRoute from '../address/addressRoutes.js';

const router = express.Router();

// Get user from token
router.get('/current', getUserFromToken);


// Get all Users
router.get('/all', authenticateAdmin, getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

//delete user by ID
router.delete('/user/:id', authenticateAdmin, deleteUser);

// Update current user
router.put('/update/current', authenticateToken, updateUserData);

// Update user by ID
router.put('/update/:id', authenticateAdmin, updateUserDataByAdmin);

//address routes
router.use('/address/create', authenticateToken, createAddress);

// Route to update an address by ID
router.put('/address/update/:id', authenticateToken, updateAddressById);

// Route to get an address by ID
router.get('/address/:id', authenticateToken, getAddressById);

// Route to get all address 
router.get('/address/get/all', authenticateToken, getAllAddress);

// Route to get all current user address
router.get('/address/get/current', authenticateToken, getCurrentUserAddresses);


// Route to delete an address by ID
router.delete('/address/:id', authenticateToken, deleteAddressById);

// Route to get all saved offers for current user
router.get('/get/saved-offers', authenticateToken, getSavedOffers);

//Route to save expo push token
router.post('/save-push-token', authenticateToken, savePushToken);


export default router;
