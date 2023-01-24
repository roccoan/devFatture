import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();
var submit = document.getElementById('submit')
submit.addEventListener("click", calcoli)
submit.addEventListener("click", createPDF)

//campi pag.1
var titolo
var cognome
var nome
var tuoIndirizzo
var tuaPiva

//campi pag.2
var nomePaziente
var taxCode
var indirizzoPaziente

//campi pag.3
var Ore
var Descrizione
var Unitario

var Ore2
var Descrizione2
var Unitario2

var Ore3
var Descrizione3
var Unitario3

var INPS
var INPSval
var MarcaDaBollo
var MarcaDaBolloval

//campi pag.4
var numFattura
var dataFattura

//calcoli & layout fattura
function calcoli() {
var totaleParziale
    if (INPS.value == true && MarcaDaBollo == true) {
        INPSval = 1.04
        MarcaDaBolloval = 2
       } else if (INPS == true && MarcaDaBollo == false) {
        INPSval = 1.04
        MarcaDaBolloval = 0
       } else if (INPS == false && MarcaDaBollo == true) {
        INPSval = 1
        MarcaDaBolloval = 2
       } else {
        INPSval = 1
       }
       let totaleParziale = ((Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3))*INPSval+MarcaDaBolloval
}


//crea PDF
function createPDF(){

    //salva file con naming convention
    var filename = string.concat("Fattura n.", numFattura, "del ", dataFattura, ",", nomePaziente, ".pdf")
    doc.save(filename);
}

