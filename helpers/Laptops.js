const Laptop = require("..//models/Laptops");

const helperLaptop = {
    validarId: async (id) => {
        const laptop = await Laptop.findById(id);
        if (!laptop) {
            throw new Error("Id no existe");
        }
    },

    validarQRCode: async (qrcode) => {
        const existe = await Laptop.find({ qrcode });
        if (existe) {
            throw new Error("El qrcode ya existe");
        }
    },

}


module.exports = {helperLaptop}