export default class LimpiezaHerramienta {
    constructor(limpiezaherramientaid, limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoproducto,cultivoid,lotecultivadoid,fincaid) {
        this.limpiezaherramientaid = limpiezaherramientaid;
        this.limfecha = limfecha;
        this.limproducto = limproducto;
        this.limequipos = limequipos;
        this.limmaquinaria = limmaquinaria;
        this.limherramientas = limherramientas;
        this.limcajones = limcajones;
        this.limtendales = limtendales;
        this.limoperario = limoperario;
        this.cultivoid = cultivoid;
        this.lotecultivadoid=lotecultivadoid;
        this.fincaid=fincaid;


        this.cultivoproducto = {
            cultivoid: cultivoproducto.cultivoid,
            productoid: cultivoproducto.productoid,
            pronombre: cultivoproducto.pronombre
        }
    }
}