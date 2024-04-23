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
    return axiosPrivateInstance.put(`/api/shipping/${payload._id}`,payload);
}
const DeleteShippingDetailsByID = (id) => {
    return axiosPrivateInstance.delete(`/api/shipping/${id}`);

}
const GetShippingDetailByID=(id)=>{
    return axiosPrivateInstance.get(`api/shipping/single/${id}`);
}


const CartIncrementByUseIDAndShippingID = (payload) => {
    return axiosPrivateInstance.post(`/api/cart/increment`, payload);

}


const ViewAllCartItemsByUserID = (id) => {
    return axiosPrivateInstance.get(`api/cart/?userID=${id}`);
}



export const cartService = {
    GetAllProductsWithRating,
    GetAllShippingDetailsByUserID,
    AddShippingDetailsByUserID,
    UpdateShippingDetailsByID,
    DeleteShippingDetailsByID,
    GetShippingDetailByID,
    ViewAllCartItemsByUserID
}