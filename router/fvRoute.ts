import { Router } from "express";
import { isAuth } from "../middleware/isauth";
import { addToFavorte } from "../controller/Favorite/addToFavotite";
import { deleteFavorite } from "../controller/Favorite/deleteFavorite";
import { getMyFovarite } from "../controller/Favorite/getMyfofarite";

const favouriteRoute = Router()

favouriteRoute.route('/addToFavorite').post(isAuth,addToFavorte)
favouriteRoute.route('/deleteFavorite').post(isAuth,deleteFavorite)
favouriteRoute.route('/myFovarite').get(isAuth,getMyFovarite)

export default favouriteRoute