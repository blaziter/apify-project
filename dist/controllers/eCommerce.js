"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * @api {get} /api/ecommerce/products Get products
 * @apiName GetProducts
 * @description parseInts are checking for maxPrice and minPrice from query and checks if they are valid. Then sends a request to https://api.ecommerce.com/products with the query and returns the response.
 */
exports.getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_PRICE = 100000;
    const MIN_PRICE = 0;
    parseInt(req.query.maxPrice) > MAX_PRICE ? res.status(400).json({ error: `Maximal price cannot be greater than ${MAX_PRICE}` }) : null;
    parseInt(req.query.minPrice) < MIN_PRICE ? res.status(400).json({ error: `Minimal price cannot be lower than ${MIN_PRICE}` }) : null;
    let query = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&');
    try {
        (0, axios_1.default)({
            method: 'GET',
            url: req.query ? `${process.env.API_URL}${query}` : process.env.API_URL,
        })
            .then(response => {
            res.status(200).json({
                total: response.data.querytotal,
                count: response.data.length,
                products: response.data,
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
