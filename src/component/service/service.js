
import axios from 'axios';

let url = "http://localhost/mdBackend/public";

async function axiosMethodPost(path, params) {
    try {
        const result = await axios.post(url + path, params);
        return result.data;
    }
    catch (error) {
        return error.message;
    }


}



async function axiosMethodPut(path, params) {
    try {
        const result = await axios.put(url + path, params);
        return result.data;
    }
    catch (error) {
        return error.message;
    }
}

async function axiosMethodGet(path) {
    try {
        const result = await axios.get(url + path);
        return result.data;
    }
    catch (error) {
        return error.message;
    }
}

//-------------------------------------------------------------------------
// Product

export function getProduct() {
    let path = '/product/getProduct';
    return axiosMethodGet(path);
};
export function getProductColorById(param) {
    let path = '/productcolor/getProductColorById';
    return axiosMethodPost(path, param);
};

export function createProduct(param) {
    let path = '/product/addProduct';
    return axiosMethodPost(path, param);
};

export function createProductColor(param) {
    let path = '/productcolor/addProductColor';
    return axiosMethodPost(path, param);
};

export function updateProduct(param, id) {
    let path = '/product/updateProduct/' + id;
    return axiosMethodPut(path, param);
};

export function deleteProductColor(param) {
    let path = '/productcolor/deleteProductColor';
    return axiosMethodPost(path, param);
};


export function addLot(param) {
    let path = '/lot/addLot';
    return axiosMethodPost(path, param);
};

export function getLot() {
    let path = '/lot/getLot';
    return axiosMethodGet(path);
};
export function setLot(param, id) {
    let path = '/lot/updateLot/' + id;
    return axiosMethodPut(path, param);
};
export function getLotCapital() {
    let path = '/lot/sumAmountCapital';
    return axiosMethodGet(path);
};
export function getLotSales() {
    let path = '/lot/sumAmountSales';
    return axiosMethodGet(path);
};



export function addOrder(param) {
    let path = '/order/addOrder';
    return axiosMethodPost(path, param);
};

export function getOrder() {
    let path = '/order/getOrder';
    return axiosMethodGet(path);
};
export function deleteOrderlist(param) {
    let path = '/order/deleteOrder';
    return axiosMethodPost(path, param);
};


export function addOrderDetaillist(param) {
    let path = '/orderdetail/addOrderDetail';
    return axiosMethodPost(path, param);
};
export function getOrderDetail() {
    let path = '/orderDetail/getOrderDetail';
    return axiosMethodGet(path);
};
export function deleteOrderDetaillist(param) {
    let path = '/orderDetail/deleteProOrder';
    return axiosMethodPost(path, param);
};
export function sumOrderTshirt() {
    let path = '/orderDetail/sumAmountShirt';
    return axiosMethodGet(path);
};
export function sumOrderTshirtChart(param) {
    let path = '/orderDetail/getOrderDetailByid';
    return axiosMethodPost(path, param);
};




export function addWithDraw(param) {
    let path = '/withdraw/addWithdraw';
    return axiosMethodPost(path, param);
};

export function getWithDraw() {
    let path = '/withdraw/getWithdraw';
    return axiosMethodGet(path);
};
export function setWithDraw(param, id) {
    let path = '/withdraw/updateWithdraw/' + id;
    return axiosMethodPut(path, param);
};
export function getWithDrawMoney() {
    let path = '/withdraw/sumAmountMoney';
    return axiosMethodGet(path);
};
export function deleteWithDraw(param) {
    let path = '/withdraw/deleteWithdraw';
    return axiosMethodPost(path, param);
};


export function addAdvert(param) {
    let path = '/advert/addAdvert';
    return axiosMethodPost(path, param);
};

export function getAdvert() {
    let path = '/advert/getAdvert';
    return axiosMethodGet(path);
};
export function setAdvert(param, id) {
    let path = '/advert/updateAdvert/' + id;
    return axiosMethodPut(path, param);
};
export function getAdvertMoney() {
    let path = '/advert/sumAmountMoneyAdvert';
    return axiosMethodGet(path);
};
export function deleteAdvert(param) {
    let path = '/advert/deleteAdvert';
    return axiosMethodPost(path, param);
};

//customer
export function addCustomer(param) {
    let path = '/customer/addCustomer';
    return axiosMethodPost(path, param);
};
export function getCustomer() {
    let path = '/customer/showCustomer';
    return axiosMethodGet(path);
};

//getAddress
export function getProvince() {
    let path = '/address/showProvince';
    return axiosMethodGet(path);
};
export function getAmphur() {
    let path = '/address/showAmphur';
    return axiosMethodGet(path);
};
export function getDistrict() {
    let path = '/address/showDistrict';
    return axiosMethodGet(path);
};

//Invest
export function addInvest(param) {
    let path = '/invest/addInvest';
    return axiosMethodPost(path, param);
};
export function getInvest() {
    let path = '/invest/getInvest';
    return axiosMethodGet(path);
};