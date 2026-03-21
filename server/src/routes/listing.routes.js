import { Router } from "express"
import { createListing, getAllListings, getListingsById } from "../controllers/listing.controller.js"
import { protect } from "../middleware/auth.middleware.js"
const router = Router();

router.post('/', protect, createListing);
router.get('/',getAllListings);
router.get('/:id',getListingsById);

export default router;