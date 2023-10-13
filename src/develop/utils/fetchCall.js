// import { useNavigate, useLocation } from "react-router-dom";
import { useAuthValues } from "../context/authContext";

function getHeaders(useAuth) {
    const token = JSON.parse(localStorage.getItem('token'));
    if(useAuth) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        };
    } 
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

export async function getApiCall(url, options) {
    return fetch(url, { ...options });
}

export const postData = async (route, useAuth=false, dataObject = {}, method="POST") => {
    const url = 'http://localhost:8000' + route;

    try {
        const response = await getApiCall(url, {
            method: method,
            headers: getHeaders(useAuth),
            body: JSON.stringify(dataObject)
        });
        // if (response.status === 401) {
        //     navigate('/login', { replace: true, state: { path: location.pathname } });
        // } else {
        //     return response;
        // }
        return response;
    } catch (error) {
        console.log('error at postData: ', error)
        return error;
    }
}

export const getData = async (route, useAuth=false) => {
    const url = 'http://localhost:8000' + route;
    // const { navigate } = useNavigate();
    // const location = useLocation();

    try {
        const response = await getApiCall(url, {
            method: 'GET',
            headers: getHeaders(useAuth),
        });
        // if (response.status === 401) {
        //     navigate('/login', { replace: true, state: { path: location.pathname } });
        // } else {
        //     return response;
        // }
        return response;
    } catch (error) {
        console.log('error at getData: ', error)
        return error;
    }
}