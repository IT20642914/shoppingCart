import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."



const GetAllProductsWithRating = () => {
    return axiosPrivateInstance.get(`/api/cart/averageratings`);
}





export const cartService = {
    GetAllProductsWithRating
//     UpdateManager,
//     GetAllManagers,
//     Login,
//     DeleteManager,
//     GetManagerById,
//     GenerateManagerReport
}