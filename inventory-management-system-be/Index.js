// Import necessary modules and setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const dburl = process.env.MONGO_DB_URL;

app.use(express.json());
app.use(cors());

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

// Supplier Schema
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  contact: String,
});

const Supplier = mongoose.model("Supplier", supplierSchema);

// Routes

// Get all inventory items with filtering, sorting, and pagination
app.get("/api/inventory", async (req, res) => {
  const { sortBy = "itemName", sortOrder = "asc", itemName } = req.query;

  try {
    let query = {};
    if (itemName) {
      query.itemName = { $regex: new RegExp(itemName, "i") };
    }

    const inventory = await Inventory.find(query)
      .populate("supplier")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

    const totalCount = inventory.length;

    res.json({ inventory, totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new inventory item
app.post("/api/inventory", async (req, res) => {
  try {
    const { itemName, quantity, supplierId } = req.body;
    const supplier = await Supplier.findById(supplierId);
    const newItem = new Inventory({ itemName, quantity, supplier });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an inventory item
app.delete("/api/inventory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Inventory.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an inventory item or supplier
app.put("/api/update-inventory/:id", async (req, res) => {
  const { id } = req.params;
  const { itemName, quantity, supplierId } = req.body;
  try {
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    const supplier = await Supplier.findById(supplierId);
    inventoryItem.itemName = itemName;
    inventoryItem.quantity = quantity;
    inventoryItem.supplier = supplier;
    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Populate the DB with at least 1000 rows of data
app.post("/api/populate-database", async (req, res) => {
  try {
    // Your code to populate the database goes here
    res.json({ message: "Database populated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
