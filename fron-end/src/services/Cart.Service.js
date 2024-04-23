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


const CartIncrementByUseID = (payload) => {
    return axiosPrivateInstance.patch(`api/cart/itemIncrease/?userId=${payload.userId}&productId=${payload.productId}`, payload);

}
const CartDecrementByUseID = (payload) => {
    return axiosPrivateInstance.patch(`api/cart/itemDecrease/?userId=${payload.userId}&productId=${payload.productId}`, payload);

}
const addToCartByUseID = (payload) => {
    return axiosPrivateInstance.post(`api/cart/`, payload);

}


const ViewAllCartItemsByUserID = (id) => {
    return axiosPrivateInstance.get(`api/cart/?userID=${id}`);
}

const RemoveItemFromCart= async (id)=>{
    return await axiosPrivateInstance.delete(`api/cart/${id}`);

}



export const cartService = {
    GetAllProductsWithRating,
    GetAllShippingDetailsByUserID,
    AddShippingDetailsByUserID,
    UpdateShippingDetailsByID,
    DeleteShippingDetailsByID,
    GetShippingDetailByID,
    ViewAllCartItemsByUserID,
    CartIncrementByUseID,
    CartDecrementByUseID,
    RemoveItemFromCart,
    addToCartByUseID
}