export class Pregunta {
    id:string = '';
    categoria:string = '';
    texto:string = '';
    opciones:string[] = [];
    respuesta:string = '';

    constructor(categoria:string, texto:string, opciones:string[], respuesta:string){
        this.categoria = categoria;
        this.texto = texto;
        this.opciones = opciones;
        this.respuesta = respuesta;
    }
}
