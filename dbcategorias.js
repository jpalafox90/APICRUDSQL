var config = require('./dbconfig.js');
const sql = require('mssql');

async function getCategoria(){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("select * from TBL_CATEGORIA");
        return categorias.recordsets;
    } catch (error) {
        console.log(error); 
    }
}   

async function getcategoriabyId(cat_id){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request()
        .input("inputparametro",sql.Int,cat_id)
        .query("select * from TBL_CATEGORIA where CAT_ID = @inputparametro");
        return categorias.recordsets;    
    } 
    catch (error) {
    }
}

async function insertcategoria(categoria){
    try {
        let pool = await sql.connect(config);
        let insertcategorias = await pool.request()
        .input("CAT_NOMBRE",sql.VarChar,categoria.CAT_NOMBRE)
        .input("CAT_OBS",sql.VarChar,categoria.CAT_OBS)
        .execute("usp_insertCategorias");
        return insertcategorias.recordsets;    
    } 
    catch (error) {
    }
}

async function updatecategoria(categoria){
    try {
        let pool = await sql.connect(config);
        let updatecategorias = await pool.request()
        .input("CAT_ID",sql.Int,categoria.CAT_ID)
        .input("CAT_NOMBRE",sql.VarChar,categoria.CAT_NOMBRE)
        .input("CAT_OBS",sql.VarChar,categoria.CAT_OBS)
        .execute("usp_updateCategorias");
        return updatecategorias.recordsets;    
    } 
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCategoria : getCategoria ,
    getcategoriabyId : getcategoriabyId,
    insertcategoria : insertcategoria,
    updatecategoria : updatecategoria   
};