import express from 'express';
import { createBusinessProfile, deleteBusinessProfile, editBusinessProfile, getAllBusinessProfile, getAllBusinessProfileByUserId, getAllCurrentUserBusinessProfile, getBusinessProfileById, incrementFollowersCount, toggleBusinessProfileActivation } from '../../../controllers/business/businessProfileController.js';
import { authenticateToken } from '../../../middlewares/auth/authMiddleware.js';


const router = express.Router();

// Route to create a new Business Profile
router.post('/create', authenticateToken, createBusinessProfile);

// Get BusinessProfile by ID and populate related fields
router.get('/:id', getBusinessProfileById);

//Get All User BusinessProfile with user ID
router.get('/get/all/:userId', getAllBusinessProfileByUserId);

//Get All User BusinessProfile with current user ID
router.get('/get/current', getAllCurrentUserBusinessProfile);

// Get All BusinessProfile   and populate related fields
router.get('/get/all', getAllBusinessProfile);

// Route to edit a Business Profile by ID
router.put('/:id', editBusinessProfile);

// Route to delete a Business Profile by ID
router.delete('/:id', deleteBusinessProfile);

// Route to toggle activation status of a Business Profile by ID
router.put('/toggle/:id', toggleBusinessProfileActivation);

//Route to increment followers count
router.put('/increment/followers/:id', incrementFollowersCount);

// router.put('/ad/status/individual/:adId', changeAdStatusForIndividual);

export default router;
