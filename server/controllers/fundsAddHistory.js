  const FundsaddHistory = require('../models/Funds');

  // Route to add a fund
  const  addFund = async (req, res) => {
    try {
      const { method, amount} = req.body;
      const user = req.user._id; // ✅ Get user from token

      const newFunds = new FundsaddHistory({
        user, // ✅ Use authenticated user's ID
        method,
        amount,
      });

      const savedFunds = await newFunds.save();
      res.status(201).json(savedFunds);
    } catch (error) {
      console.error('Error adding the funds:', error);
      res.status(400).json({ message: "Error adding the Funds" });
    }
  };


  // Route to update a fund
  const updateFundStatus = async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
    
      try {
        const fund = await FundsaddHistory.findById(id);
        if (!fund) {
          return res.status(404).json({ success: false, message: 'Payment not found' });
        }
    
        fund.status = status;
        await fund.save();
    
        res.status(200).json({ success: true, message: 'Payment status updated', fund });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
      }
  };

  // Route for deleting a fund
  const deleteFund = async (req, res) => {
      try {
          const deletedFund = await FundsaddHistory.findByIdAndDelete(req.params.id);

          if (!deletedFund) {
              return res.status(404).json({ message: "Fund not found" });
          }

          res.status(200).json({ message: 'Fund deleted successfully' });  // 200 OK for successful deletion
      } catch (error) {
          console.error('Error deleting the fund:', error);  // Log the error for debugging
          res.status(400).json({ message: "Error deleting the Fund" });
      }
  };

  // Route for a single fund
  const fund = async (req, res) => {
      try {
          const fund = await FundsaddHistory.findById(req.params.id).populate('user');  // Populate user details
          if (!fund) {
              return res.status(404).json({ message: "Fund not found" });
          }

          res.status(200).json(fund);  // Return the fund data
      } catch (error) {
          console.error('Error fetching single fund:', error);  // Log the error for debugging
          res.status(400).json({ message: "Error fetching single Fund" });
      }
  };

  // Route for displaying all funds
  // Route for displaying all funds for a specific user
  const getAllFunds = async (req, res) => {
    try {
      let funds;

      if (req.user.isAdmin) {
        // ✅ Admin can see all funds
        funds = await FundsaddHistory.find().populate('user');
      } else {
        // ✅ Normal user sees only their funds
        funds = await FundsaddHistory.find({ user: req.user._id }).populate('user', 'name');
      }

      res.status(200).json(funds);
    } catch (error) {
      console.error('Error fetching funds:', error);
      res.status(400).json({ message: "Error fetching the Funds" });
    }
  };



  module.exports = { addFund, updateFundStatus, deleteFund, fund,  getAllFunds };
