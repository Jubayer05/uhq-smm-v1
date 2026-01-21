const SpecialPricing = require('../models/specialPricing')


const addPricing = async(req, res) =>{
    try {
        const {user, service, costPrice, sellingPrice, specialPrice} = req.body;
        
        const newPrice = new SpecialPricing({
            user,
            service,
            costPrice,
            sellingPrice,
            specialPrice
        })
        const savedPrice = await newPrice.save();
        res.status(201).json(savedPrice)
    } catch (error) {
        console.error('Error adding the Pricing:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error adding the pricing" });
    }
}

// Route to update a Pricing
const updatePricing = async (req, res) => {
    try {
        const { service, costPrice, sellingPrice, specialPrice } = req.body;

        // Find the fund by ID and update
        const updatedPrice = await SpecialPricing.findByIdAndUpdate(
            req.params.id,
            { service, costPrice, sellingPrice, specialPrice },
            { new: true }
        );

        if (!updatedPrice) {
            return res.status(404).json({ message: "Price not found" });
        }

        res.status(200).json(updatedPrice);  // 200 OK status for successful updates
    } catch (error) {
        console.error('Error updating the price:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error updating the price" });
    }
};

// Route for deleting a fund
const deletePricing = async (req, res) => {
    try {
        const deletedPrice = await SpecialPricing.findByIdAndDelete(req.params.id);

        if (!deletedPrice) {
            return res.status(404).json({ message: "Price not found" });
        }

        res.status(200).json({ message: 'Price deleted successfully' });  // 200 OK for successful deletion
    } catch (error) {
        console.error('Error deleting the Price:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error deleting the Price" });
    }
};
// Route for a single price
const price = async (req, res) => {
    try {
        const price = await SpecialPricing.findById(req.params.id);  // Populate user details
        if (!price) {
            return res.status(404).json({ message: "Price not found" });
        }

        res.status(200).json(price);  // Return the fund data
    } catch (error) {
        console.error('Error fetching single Price:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error fetching single Price" });
    }
};

// Route for displaying all funds
const displayAllPricing = async (req, res) => {
    try {
        const allPricing = await SpecialPricing.find().sort({ createAt: -1 });  // Sort by creation date
        res.status(200).json(allPricing);  // Return all funds with populated user field
    } catch (error) {
        console.error('Error fetching Pricing:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error fetching the Pricing" });
    }
};

module.exports = {addPricing, updatePricing, deletePricing, price, displayAllPricing}