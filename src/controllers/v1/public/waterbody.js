import WaterBody from "../../../models/waterBody.js";

export const getWaterBodies = async (req, res) => {
  try {
    const waterBodies = await WaterBody.find().populate('addedBy', 'name email');

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
