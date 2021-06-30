import Cart from "../models/shoppingCartModel.js";
import Product from '../models/productModel.js'


export const getCartITems = async (req, res) => {
  try {
    const { user } = req.params;
    const cart = await Cart.findOne({ cartOwner: user });

    if (!cart) {
      const newCart = new Cart({ cartOwner: user, products: [] });
      await newCart.save();
      return res.status(200).json([]);
    }
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addPrevICartItems = async (req, res) => {
  const { products } = req.body;
  const { user } = req.params;
  try {
    const cart = await Cart.findOne({ cartOwner: user });
    if (!cart) {
      const newCart = new Cart({ cartOwner: user, products });
      await newCart.save();
      return res.status(200).json(products);
    }
    cart.products.push(...products);
    cart.products = cart.products.filter(
      (item, index, array) =>
        index === array.findIndex((t) => t._id === item._id)
    );
    await Cart.findByIdAndUpdate(cart._id, cart, { new: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { user } = req.params;
    const product = req.body;
    const cart = await Cart.findOne({ cartOwner: user });
    cart.products.push(product);

    await Cart.findByIdAndUpdate(cart._id, cart, { new: true });

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { user, id } = req.params;

    const cart = await Cart.findOne({ cartOwner: user });
    cart.products = cart.products.filter((product) => product._id !== id);

    await Cart.findByIdAndUpdate(cart._id, cart, { new: true });

    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartOwner: req.userId });
    cart.products = [];
    await Cart.findByIdAndUpdate(cart._id, cart, { new: true });
    res.status(200).json([]);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error)
  }
};

export const checkIfAvailable = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product.isAvailable) return res.status(200).json(true);
    res.status(200).json(false);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};
