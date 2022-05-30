import {getConnection} from "../Database/Connection";
import { format } from 'date-fns';

const getAll = async (request,response) => {
    try {
        const { email } = request.params; 
        const connection = await getConnection(); 
        const result = await connection.query('SELECT * FROM category WHERE user_email = ?' , email );
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const addOperation = async (request,response) => {
    try {
        const { name, description , user_email } = request.body;
        if(name === '' || description === '' ){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        var date_created = format(new Date(), 'yyyy-MM-dd');
        const category = { name, description, date_created , user_email };
        const connection = await getConnection(); 
        const result = await connection.query('INSERT INTO category SET ?', category);
        response.json({message: `Number of rows affected: ${result.affectedRows}`});
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const searchForId = async (request,response) => {
    try {
        const { id } = request.params; 
        if(id === undefined){
            response.status(400).json({message: "Bad Request. No search parameters."})
        }
        const connection = await getConnection(); 
        const result = await connection.query('SELECT * FROM category WHERE id = ?', id );
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const updateOperation = async (request,response) => {
    try {
        const { id } = request.params; 
        var { name, description, date_created , user_email } = request.body;
        if(id === '' ||  name === '' || description === '' || date_created === '' ){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        date_created = format(new Date(date_created), 'yyyy-MM-dd');
        const category = { name, description, date_created , user_email };
        const connection = await getConnection(); 
        const result = await connection.query('UPDATE category SET ? WHERE id = ?', [category,id] );
        response.json({message: `Number of rows affected: ${result.affectedRows}`});
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const deleteOperation = async (request,response) => {
    try {
        const { id } = request.params;
        if(id === undefined){
            response.status(400).json({message: "Bad Request. No search parameters."})
        }
        const connection = await getConnection(); 
        const result = await connection.query('DELETE FROM category WHERE id = ?', id );
        response.json({message: `Number of rows affected: ${result.affectedRows}`});
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

export const actions = {
    getAll,
    addOperation,
    searchForId,
    updateOperation,
    deleteOperation
}