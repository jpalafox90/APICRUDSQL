const dbocategorias  = require('./dbcategorias');
var categoria = require('./categoriaET.js')

var express = require('express');
var bodyparse = require('body-parser');
var cors = require('cors');
const { request } = require('express');

var app = express();
var router = express.Router();

const swaggerjsdoc = require('swagger-jsdoc');
const swaggeruiexpress = require('swagger-ui-express');

const swaggeroption = {
    swaggerDefinition : {
        info : {
            version : '1.0.1',
            title : 'API REST Categorias',
            description : 'API REST Categorias',
            contact : {
                name : 'JPalafox'
            }
        },
        server : ["http://localhost:8090"]
    },
    apis : ['api.js']
};

const swaggerdoc = swaggerjsdoc(swaggeroption); 
app.use('/api-docs', swaggeruiexpress.serve,swaggeruiexpress.setup(swaggerdoc));

app.use(bodyparse.urlencoded({extended : true}));
app.use(bodyparse.json());
app.use(cors());
app.use('/api',router);


// Routes
/**
 * @swagger
 * /api/categoria:
 *  get:
 *      description: Use para obtener todas las categorias
 *      responses:
 *          '200':
 *              description: Listados Correctamente
 */
//Ruta para todas las categorias
router.route('/categoria').get((request,response) => {
    dbocategorias.getCategoria().then(result => {
        response.json(result[0]);
    })
})

// Routes
/**
 * @swagger
 * /api/Categoria/{id}:
 *  get:
 *    description: Obtener categoria por ID
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *        '200':
 *          description: Categoria obtenida correctamente
 */
//Ruta para una categoria por id
router.route('/categoria/:cat_id').get((request,response) => {
    dbocategorias.getcategoriabyId(request.params.cat_id).then(result => {
        response.json(result[0]);
    })
})


// Routes
/**
 * @swagger
 * /api/categoria/guardar:
 *  post:
 *      description: Use para guardar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                 cat_id: ""
 *                 CAT_NOMBRE: "Categoria 1"
 *                 CAT_OBS: "Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria guardada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
router.route('/categoria/guardar').post((request,response) => {
    let categoria = {...request.body}
    dbocategorias.insertcategoria(categoria).then(result => {
        response.json(result[0]);
    })
})

// Routes
/**
 * @swagger
 * /api/categoria/actualizar:
 *  put:
 *      description: Use para actualizar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                CAT_ID: "1"
 *                CAT_NOMBRE: "Actualizar Categoria 1"
 *                CAT_OBS: "Actualizar Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria actualizada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
//Ruta para una actualizar una categoria segun clase categoria
router.route('/categoria/actualizar').put((request,response) => {
    let categoria = {...request.body}
    dbocategorias.updatecategoria(categoria).then(result => {
        response.json(result[0]);
    })
})


var port = process.env.port  || 8090;
app.listen(port);
console.log("iniciando en el puerto: "  + port );