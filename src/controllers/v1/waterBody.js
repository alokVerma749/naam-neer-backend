import WaterBody from "../../models/waterBody.js";

export const addWaterBody = async (req, res) => {
  try {
    const { name, location, size, condition, pollutionLevel, status } = req.body;

    const waterBody = await WaterBody.create({
      name,
      location,
      size,
      condition,
      pollutionLevel,
      status,
      addedBy: req.user.id // Logged-in user adding the water body
    });

    res.status(201).json({
      success: true,
      data: waterBody
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all water bodies for the logged-in user
export const getWaterBodies = async (req, res) => {
  try {
    const userId = req.user.id;

    const waterBodies = await WaterBody.find({ addedBy: userId }).populate('addedBy', 'name email');

    res.status(200).json({
      success: true,
      data: waterBodies
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
