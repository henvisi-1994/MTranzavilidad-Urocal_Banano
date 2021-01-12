// Data Transfer Object
// Salida de API
// Objeto que ayuda a mover datos entre componentes (capas)
// **************
// Ignoren este archivo
//************* */

const single = (resource, authUser) => ({
    id: resource.personaid,
    username: resource.percedula,
    email: resource.peremail
    //email: authUser.role === "juan" ? resource.email : undefined;
});

const multiple = (resources, authUser) => resources.map((resource) => single(resource, authUser));

module.exports = {
    single, multiple
};