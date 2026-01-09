import { Request, Response } from "express";
import Address from "../models/Address.js";

/**
 * GET /api/addresses
 * Get all addresses of logged-in user
 */
export const getMyAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const addresses = await Address.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.json({ addresses });
  } catch (error) {
    console.error("Get Addresses Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/addresses
 * Create a new address
 */
export const createAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    // Check if user already has a default address
    const hasDefault = await Address.exists({
      userId,
      isDefault: true,
    });

    // If new address is default, unset previous default
    if (payload.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const address = await Address.create({
      ...payload,
      userId,
      // First address becomes default automatically
      isDefault: payload.isDefault ?? !hasDefault,
    });

    return res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error("Create Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/addresses/:id
 * Update an existing address
 */
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    // Prevent userId manipulation
    delete req.body.userId;

    const address = await Address.findOne({ _id: id, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If changing default, unset previous default
    if (req.body.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    Object.assign(address, req.body);
    await address.save();

    return res.json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/addresses/:id
 * Delete an address
 */
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const address = await Address.findOneAndDelete({ _id: id, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If default address deleted, assign another as default
    if (address.isDefault) {
      const nextAddress = await Address.findOne({ userId }).sort({
        createdAt: -1,
      });

      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    return res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/addresses/:id/default
 * Set an address as default
 */
export const setDefaultAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.updateMany({ userId }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    return res.json({
      message: "Default address updated",
      address,
    });
  } catch (error) {
    console.error("Set Default Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
