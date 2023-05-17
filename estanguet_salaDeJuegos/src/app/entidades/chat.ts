export class Chat {
    id:string;
    texto:string;
    fecha:number;
    mailUsr:string|undefined;
    color:string;
    position:string;
    left:string;

    constructor(texto:string, fecha:number, mailUsr:string|undefined){
        this.id = '';
        this.texto = texto;
        this.fecha = fecha;
        this.mailUsr = mailUsr;
        this.color = '';
        this.position = '';
        this.left = '';
    }
}
