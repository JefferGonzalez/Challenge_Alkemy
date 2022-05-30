import {getConnection} from "../Database/Connection";
import { format } from 'date-fns';

const getAll = async (request,response) => {
    try {
        const { email } = request.params; 
        const connection = await getConnection(); 
        const result = await connection.query('SELECT * FROM operation WHERE user_email = ?' , email );
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const addOperation = async (request,response) => {
    try {
        var { concept, amount, date, type, category_id , user_email } = request.body;
        if(concept === '' || amount === '' || date === '' || type === '' || category_id === ''){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        date = format(new Date(date), 'yyyy-MM-dd');
        const operation = { concept, amount, date, type, category_id , user_email };
        const connection = await getConnection(); 
        const result = await connection.query('INSERT INTO operation SET ?', operation);
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
        const result = await connection.query('SELECT * FROM operation WHERE id = ?', id );
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const updateOperation = async (request,response) => {
    try {
        const { id } = request.params; 
        var { concept, amount, date, type, category_id , user_email } = request.body;
        if(id === '' ||  concept === '' || amount === '' || date === '' || type === '' || category_id === ''){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        date = format(new Date(date), 'yyyy-MM-dd');
        const operation = { concept, amount, date, type, category_id , user_email };
        const connection = await getConnection(); 
        const result = await connection.query('UPDATE operation SET ? WHERE id = ?', [operation,id] );
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
        const result = await connection.query('DELETE FROM operation WHERE id = ?', id );
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