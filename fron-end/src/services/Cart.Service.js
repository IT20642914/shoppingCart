import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."



const GetAllProductsWithRating = () => {
    return axiosPrivateInstance.get(`/api/cart/averageratings`);
}
const GetAllShippingDetailsByUserID = (id) => {
    return axiosPrivateInstance.get(`/api/shipping/${id}`);
}
const AddShippingDetailsByUserID = (payload) => {
    return axiosPrivateInstance.post(`api/shipping/`,payload);
}
const UpdateShippingDetailsByID = (payload) => {
    return axiosPrivateInstance.put(`/api/shipping/`,payload);
}
const DeleteShippingDetailsByID = (id) => {
    return axiosPrivateInstance.delete(`/api/shipping/${id}`);

}





export const cartService = {
    GetAllProductsWithRating,
    GetAllShippingDetailsByUserID,
    AddShippingDetailsByUserID,
    UpdateShippingDetailsByID,
    DeleteShippingDetailsByID
}