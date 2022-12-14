import axios from "axios";
const URL = "https://faculty-info-backend-production.up.railway.app/api/professors";

export function updateProfessor(id, body){
    return axios.put(`${URL}/${id}`, body);
}

export function getProfessorById(id){
    return axios.get(`${URL}/` + id);
}

export function getAllProfessors(){
    return axios.get(`${URL}/`);
}