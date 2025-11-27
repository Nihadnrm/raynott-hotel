import base_url from "./base_url";
import commonApi from "./commonApi";


export const registerApi = async (data) => {

    return await commonApi(`${base_url}/register`,"POST","", data)

}
export const loginApi = async (data) => {

    return await commonApi(`${base_url}/login`,"POST","",data)
}



export const addHotelApi = async (data) => {
  
    return await commonApi(`${base_url}/addHotel`,"POST","",data)

}
export const getHotelApi = async () => {
    

    return await commonApi(`${base_url}/getHotel`,"GET","")

}
export const getSingleHotelApi = async (id) => {

  return await commonApi(`${base_url}/getHotel/${id}`, "GET", "");

};



export const addBookingApi = async (data) => {
     const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/addBooking`,"POST",header,data)

}
export const getBookingApi = async () => {
     const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/getBooking`,"GET",header)

}
export const getAllBookingApi = async () => {
     
    return await commonApi(`${base_url}/Allbooking`,"GET","")

}
export const DeleteBookingApi = async (id) => {
      const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/deleteBooking/${id}`,"DELETE",header)

}



export const getBookedDatesApi = async (hotelId) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  return await commonApi(`${base_url}/bookedDates/${hotelId}`, "GET", header);
};



export const AddEnquiryApi = async (data) => {
      const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/addEnquiry`,"POST",header,data)

}
export const getEnquiryApi = async () => {

    return await commonApi(`${base_url}/getEnquiry`,"GET")

}