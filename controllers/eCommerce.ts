import axios from "axios";
import { Request, Response } from "express";
import Ecommerce from "../types/eCommerce";
/**
 * @api {get} /api/ecommerce/products Get products
 * @apiName GetProducts
 * @description parseInts are checking for maxPrice and minPrice from query and checks if they are valid. Then sends a request to https://api.ecommerce.com/products with the query and returns the response.
 */
exports.getProducts = async (req: Request, res: Response) => {
    const MAX_PRICE = 100000
    const MIN_PRICE = 0
    parseInt(req.query.maxPrice as string) > MAX_PRICE ? res.status(400).json({ error: `Maximal price cannot be greater than ${MAX_PRICE}` }) : null
    parseInt(req.query.minPrice as string) < MIN_PRICE ? res.status(400).json({ error: `Minimal price cannot be lower than ${MIN_PRICE}` }) : null
    let query = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&')
    try {
        axios({
            method: 'GET',
            url: req.query ? `${process.env.API_URL}${query}` : process.env.API_URL,
        })
        .then(response => {
            res.status(200).json({
                total: response.data.querytotal,
                count: response.data.length,
                products: response.data,
            } as Ecommerce);
        })
    } catch (error) {
        res.status(500).json({
            error: error,
        });
    }
}