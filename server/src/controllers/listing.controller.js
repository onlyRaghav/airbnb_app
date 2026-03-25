import listingModel from "../models/listing.model.js";

export const createListing = async (req, res) => {
    try {
        const { title, price, description, images, location } = req.body;

        if (!title || !price || !description || !location) {
            return res.status(400).json({
                message: "Missing required fields"
            })
        }

        const listing = await listingModel.create({
            title,
            price,
            description,
            location,
            images,
            host: req.user._id
        });
        res.status(201).json({
            message: "listing created successfully",
            listing,
        })
    } catch (err) {
        console.error("Error while creating listing:", err)
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getAllListings = async (req, res) => {
    try {
        const getListings = await listingModel.find().populate("host", "name email");

        res.status(200).json(getListings);

    } catch (error) {
        console.error("Error while fetching listings:", error);
        res.status(500).json({
            message: "server error"
        })
    }
}

export const getListingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const listings = await listingModel.findById(id).populate("host", "name email");
        if (!listings) {
            res.status(404).json({
                message: "listing not found"
            })
        }
        res.status(200).json(listings);
    } catch (error) {
        console.error("Get lisiting error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModel.findById(id);

        if (!listing) {
            return res.status(404).json({
                message: "listing not found"
            })
        }
        if (listingModel.host.toString !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not Authorized to update this listing"
            })
        }

        const { title, description, location, images, price } = req.body;

        if (title !== undefined) listing.title = title;
        if (description !== undefined) listing.description = description;
        if (location !== undefined) listing.location = location;
        if (price !== undefined) listing.price = price;
        if (images !== undefined) listing.images = images;

        const updatedListing = await listing.save();

        res.status(200).json({
            message: "Listing updated successfully",
            listing: updatedListing
        })
    } catch (err) {
        console.error("Updating Listind Error:", err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const deleteListing = async (req, res) => {

    try {
        const { id } = req.params;
        const listing = await listingModel.findById(id);
        if (!listing) {
            return res.status(404).json({
                message: "listing not found"
            })
        }
        if (req.user._id.toString() == listing.host.toString()) {
            return res.status(403).json({
                message: "Not Authorized. Can't perform Operation."
            })
        }
        await listingModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "listing deleted successfully"
        })
    } catch (err) {
        console.error("Error removing listing:", err);
        res.status(500).json({
            message: "server error"
        })
    }
}