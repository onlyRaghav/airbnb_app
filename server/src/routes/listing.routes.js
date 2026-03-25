import { Router } from "express"
import { createListing, getAllListings, getListingsById, updateListing, deleteListing } from "../controllers/listing.controller.js"
import { protect } from "../middleware/auth.middleware.js"
const router = Router();

router.post('/', protect, createListing);
router.get('/', getAllListings);
router.get('/:id', getListingsById);
router.put('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);

export default router;