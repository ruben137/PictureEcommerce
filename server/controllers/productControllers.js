import Product from "../models/productModel.js";
import ProductFull from "../models/productModelFull.js";
import User from "../models/userModel.js";
import Purchase from "../models/purchasesModel.js";
import fs from "fs";
import request from "request";

export const getProducts = async (req, res) => {
  const { page } = req.params;
  try {
    const products = await Product.find({ isAvailable: true })
      .limit(6)
      .skip(+page)
      .sort({
        createdAt: -1,
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const getProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};
export const getFullProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ userName: req.userId });

    const product = await ProductFull.findOne({ id });
    if (user.isAdmin) return res.status(200).json(product.productFull);
    res.status(404).json("no access to that content");
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    const newProductFull = new ProductFull({
      ...product,
      productFull: product.productImgFull,
      id: newProduct._id,
    });
    await newProductFull.save();
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateProduct = async (req, res) => {
  const product = req.body;

  try {
    await Product.findByIdAndUpdate(product._id, product, { new: true });
    await ProductFull.findOneAndUpdate(
      { id: product._id },
      { productFull: product.productImgFull },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const buyProduct = async (req, res) => {
  try {
    const { products } = req.body;

    const { user } = req.params;

    await Promise.all(
      products.map(async (product) => {
        const fullImg = await ProductFull.findOne({ id: product._id });
        (fullImg.token = product.token),
          await ProductFull.findByIdAndUpdate(fullImg._id, fullImg, {
            new: true,
          });

        return Product.findByIdAndUpdate(
          product._id,
          {
            ...product,

            isAvailable: false,
          },
          { new: true }
        );
      })
    );

    await Promise.all(
      products.map((product) => {
        const newPurchase = new Purchase({ owner: user, token: product.token });
        return newPurchase.save();
      })
    );

    res.status(200).json("succesfully purchased");
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const getPurchases = async (req, res) => {
  try {
    if (!req.userId) return res.status(200).json([]);
    const purchases = await Purchase.find({owner:req.userId});
    res.status(200).json(purchases);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const getPurchasedPic = async (req, res) => {
  const { token } = req.params;
  try {
    const product = await ProductFull.findOne({ token });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    await ProductFull.findOneAndDelete({ id });
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};
