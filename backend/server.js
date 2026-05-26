const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'proyecto_juegos'

});

db.connect((err)=>{

    if(err){

        console.log(err);

    }else{

        console.log('MySQL conectado');
    }

});

app.listen(3000,()=>{

    console.log('Servidor corriendo');
});

app.post('/register',(req,res)=>{

    const {

        nombre,
        email,
        fechaNacimiento,
        password

    } = req.body;

    const sql = `
    
    INSERT INTO usuarios
    (nombre,email,fechaNacimiento,password)
    
    VALUES (?,?,?,?)
    
    `;

    db.query(

        sql,

        [
            nombre,
            email,
            fechaNacimiento,
            password
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);
            }

            res.json({
                message:'Usuario registrado'
            });

        }

    );

});

app.post('/login',(req,res)=>{

    const {

        email,
        password

    } = req.body;

    const sql = `
    
    SELECT * FROM usuarios
    
    WHERE email = ?
    AND password = ?
    
    `;

    db.query(

        sql,

        [
            email,
            password
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);
            }

            if(result.length == 0){

                return res.status(401).json({

                    message:'Credenciales incorrectas'

                });

            }

            res.json({

                message:'Login correcto',
                user:result[0]

            });

        }

    );

});

app.post('/score',(req,res)=>{

    const {

        usuario,
        juego,
        puntaje

    } = req.body;

    const sql = `
    
    INSERT INTO scores
    
    (usuario,juego,puntaje,fecha)
    
    VALUES (?,?,?,NOW())
    
    `;

    db.query(

        sql,

        [
            usuario,
            juego,
            puntaje
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);
            }

            res.json({

                message:'Score guardado'

            });

        }

    );

});

app.get('/scores',(req,res)=>{

    const sql = `
    
    SELECT *
    
    FROM scores
    
    ORDER BY puntaje DESC
    
    `;

    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json(err);
        }

        res.json(result);

    });

});