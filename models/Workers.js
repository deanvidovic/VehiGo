const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



const workerSchema = new mongoose.Schema({
    worker_id_number: {
        type: Number,
        unique: true,
        length: [11, 'OIB mora imati tocno 11 znamenaka!'],
        required: [true, 'Morate unijeti OIB novog zaposlenika!']
    },

    worker_first_name: {
        type: String,
        required: [true, 'Morate unijeti ime novog zaposlenika!']
    },

    worker_last_name: {
        type: String,
        required: [true, 'Morate unijeti prezime novog zaposlenika!']
    },

    worker_email: {
        type: String,
        required: [true, 'Morate unijeti e-mail adresu novog zaposlenika!'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Morate unijeti validnu e-mail adresu.']
    },

    worker_phone_number: {
        type: String,
        minlength: [9, 'Broj mobitela mora imati najmanje 9 znamenaka!'],
        required: [true, 'Morate unijeti broj mobitela novog zaposlenika!'],
    },

    worker_address: {
        type: String,
        required: [true, 'Morate unijeti adresu novog zaposlenika!']
    },

    worker_username: {
        type: String,
        unique: true,
        required: [true, 'Morate unijeti vasu lozinku!'],
        minlength: [6, 'Vasa lozinka mora imati minimalno 6 znakova!']
    },

    worker_password: {
        type: String,
        required: [true, 'Morate unijeti vasu lozinku!'],
        minlength: [6, 'Vasa lozinka mora imati minimalno 6 znakova!']
    }
});

workerSchema.statics.login = async function (worker_username, worker_password) {
    const worker = await this.findOne({ worker_username }); // this je za worker model

    if (worker) {
        const isPasswordValid = await bcrypt.compare(worker_password, worker.worker_password);

        if (isPasswordValid) {
            return worker;
        }

        throw Error('Vasa lozinka nije tocna!')
    } 

    throw Error('Vase korisnicko ime nije tocno!');
    
}

workerSchema.pre('save', async function (next) {
    //this je objekt koji smo kreirali prije nego se spremi    
    const salt = await bcrypt.genSalt(); //generiramo neki salt koji cemo zakvacit na nasu sifru radi bolje i sigurnije enkripcije, funkcija je asinkrona
    this.worker_password = await bcrypt.hash(this.worker_password, salt)
    next();
});

const Worker = mongoose.model('worker', worker);


module.exports = Worker;

