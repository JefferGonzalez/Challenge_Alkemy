import {getConnection} from "../Database/Connection";

const getAll = async (request,response) => {
    try {
        const connection = await getConnection(); 
        const result = await connection.query('SELECT * FROM operation');
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
};

const addOperation = async (request,response) => {
    try {
        const { concept, amount, date, type } = request.body;
        if(concept === undefined || amount === undefined || date === undefined || type === undefined){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        const operation = { concept, amount, date, type };
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
        const {concept, amount, date, type } = request.body;
        if(id === undefined ||  concept === undefined || amount === undefined || date === undefined || type === undefined){
            response.status(400).json({message: "Bad Request. Please fill all fields."})
        }
        const operation = {concept, amount, date, type };
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