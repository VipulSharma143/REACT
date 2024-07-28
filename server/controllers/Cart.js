import ShoppingCartModel from '../models/ShoppingCart.js';
import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';

export const CreateCartItem = async (req, res) => {
    try {
        const { userId, productId, count, price } = req.body;

        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(productId);

        if (!user || !product) {
            return res.status(404).send({ message: "User or Product not found" });
        }

        const cartItem = await ShoppingCartModel.create({
            user: userId,
            product: productId,
            count,
            price,
        });

        res.status(201).send({ message: "Cart Item Created", cartItem });
    } catch (error) {
        console.log("Fail To Create Cart Item", error);
        res.status(500).send({ message: "Fail To Create Cart Item" });
    }
};

export const UpdateCartItem = async (req, res) => {
    try {
        const { id, count, price } = req.body;

        const cartItem = await ShoppingCartModel.findByIdAndUpdate(
            id,
            { count, price },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).send({ message: "Unable To Update Cart Item" });
        }

        res.status(200).send({ message: "Cart Item Updated", cartItem });
    } catch (error) {
        console.log("Fail To Update Cart Item", error);
        res.status(500).send({ message: "Fail To Update Cart Item" });
    }
};

export const DeleteCartItem = async (req, res) => {
    try {
        const { id } = req.body;

        const result = await ShoppingCartModel.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Cart Item Deleted" });
        } else {
            res.status(404).send({ message: "Unable To Delete Cart Item" });
        }
    } catch (error) {
        console.log("Fail To Delete Cart Item", error);
        res.status(500).send({ message: "Fail To Delete Cart Item" });
    }
};

export const GetCartItemsByUserId = async (req, res) => {
    try {
        const { userId } = req.query;

        const cartItems = await ShoppingCartModel.find({ user: userId })
            .populate('user')
            .populate('product');

        res.status(200).send({ cartItems });
    } catch (error) {
        console.log("Fail To Fetch Cart Items", error);
        res.status(500).send({ message: "Fail To Fetch Cart Items" });
    }
};

export const GetCartItemDetails = async (req, res) => {
    try {
        const { id } = req.query;

        const cartItem = await ShoppingCartModel.findById(id)
            .populate('user')
            .populate('product');

        if (!cartItem) {
            return res.status(404).send({ message: "Cart Item not found" });
        }

        res.status(200).send({ cartItem });
    } catch (error) {
        console.log("Fail To Fetch Cart Item Details", error);
        res.status(500).send({ message: "Fail To Fetch Cart Item Details" });
    }
};

export const UpdateCartItemQuantity = async (req, res) => {
    try {
        const { id, count } = req.body;

        const cartItem = await ShoppingCartModel.findById(id);

        if (!cartItem) {
            return res.status(404).send({ message: "Cart Item not found" });
        }

        cartItem.count = count;

        await cartItem.save();

        res.status(200).send({ message: "Cart Item Quantity Updated", cartItem });
    } catch (error) {
        console.log("Fail To Update Cart Item Quantity", error);
        res.status(500).send({ message: "Fail To Update Cart Item Quantity" });
    }
};
