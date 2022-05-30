import {getConnection} from "../Database/Connection";
import { format } from 'date-fns';


const searchForEmail = async (request,response) => {
    try {
        const { email } = request.params; 
        if(email === ''){
            response.status(400).json({message: "Bad Request. No search parameters."})
        }
        const connection = await getConnection(); 
        const result = await connection.query('SELECT * FROM user WHERE email = ?', email );
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const addUser = async (request,response) => {
    try {
        var { name , email} = request.body;
        if(name === '' || email === ''){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        const user = { name, email };
        const connection = await getConnection(); 
        const result = await connection.query('INSERT INTO user SET ?', user);
        response.json({message: `Number of rows affected: ${result.affectedRows}`});
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};


export const actions = {
    searchForEmail,
    addUser
}