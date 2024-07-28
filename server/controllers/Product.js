import DepartmentModel from "../models/Department.js";
import ProductModel from "../models/Product.js";

export const CreateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const ProData = await ProductModel.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            images: images,
            department: req.body.departmentId,
        });
        if (ProData) res.status(201).send({ message: "Product Created" });
        else res.status(404).send({ message: "Unable To Create Product" });
    } catch (error) {
        console.log("Fail To Submit Data");
        res.status(500).send({ message: "Fail To Submit Data", error });
    }
};

export const UpdateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const ProData = await ProductModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                images: images,
                department: req.body.departmentId,
            }
        );
        if (ProData) res.status(200).send({ message: "Product Updated" });
        else res.status(404).send({ message: "Unable To Update Product" });
    } catch (error) {
        console.log("Fail To Submit Data");
        res.status(500).send({ message: "Fail To Submit Data", error });
    }
};

export const DeleteProduct = async (req, res) => {
    try {
        const ProData = await ProductModel.deleteOne({
            _id: req.body.id,
        });
        if (ProData.deletedCount == 1) res.status(200).send({ message: "Product Deleted" });
        else res.status(404).send({ message: "Unable To Delete Product" });
    } catch (error) {
        res.status(500).send({ message: "Fail To Delete Product", error });
    }
};

export const GetProductsByDepartmentId = async (req, res) => {
    try {
        const ProData = await ProductModel.find({
            department: req.query.departmentId,
        }).populate({ path: "department", populate: [{ path: "university" }] });
        res.status(200).send({ ProData });
    } catch (error) {
        console.log('Fail To Find Data');
        res.status(500).send({ message: "Fail To Find Data", error });
    }
};

export const GetProductDetails = async (req, res) => {
    try {
        const ProData = await ProductModel.findOne({
            _id: req.query.id,
        }).populate({ path: "department", populate: [{ path: "university" }] });
        res.status(200).send({ ProData });
    } catch (error) {
        console.log('Fail To Find Data');
        res.status(500).send({ message: "Fail To Find Data", error });
    }
};

export const UpdateProductQuantity = async (req, res) => {
    try {
        let productIndb = await ProductModel.findOne({ _id: req.body.id });
        let active = true;
        if (productIndb.quantity - req.body.quantity <= 0) active = false;
        let ProData = await ProductModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                active: active,
                quantity: productIndb.quantity - req.body.quantity,
            }
        );
        if (ProData) res.status(200).send({ message: "Product Quantity Updated" });
        else res.status(404).send({ message: "Unable To Update Product Quantity" });
    } catch (error) {
        console.log('Fail To Find Data');
        res.status(500).send({ message: "Fail To Update Product Quantity", error });
    }
};

export const GetProductDetailsForUser = async (req, res) => {
    try {
        const ProData = await ProductModel.findOne({
            _id: req.query.id,
        });
        res.status(200).send({ ProData });
    } catch (error) {
        console.log('Fail To Find Product');
        res.status(500).send({ message: 'Fail To Find Product', error });
    }
};

export const GetProductDetailsById = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await ProductModel.findById(id);
        if (product) {
            res.status(200).send({ product });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.log('Fail To Find Product');
        res.status(500).send({ message: 'Fail To Find Product', error });
    }
};
