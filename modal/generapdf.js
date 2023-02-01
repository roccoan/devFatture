window.jsPDF = window.jspdf.jsPDF;
var submit = document.getElementById('submit')
submit.addEventListener("click", createPDF)

//calcoli & layout fattura & salvaPDF
function createPDF() {
    
    // Default export is a4 paper, portrait, using millimeters for units
    var doc = new jsPDF();

    //campi pag.1
    var titolo = document.querySelector('input[name="titolo"]:checked').value
    var pre
    var cognome = document.querySelector('input[name="Cognome"]').value
    var nome = document.querySelector('input[name="Nome"]').value
    var tuoIndirizzo = document.querySelector('input[name="Indirizzo"]').value
    var tuaPiva = document.querySelector('input[name="P.IVA"]').value

    if (titolo == 'M') {
        pre = "Dott. "
    } else if (titolo == 'F'){
        pre = "Dott.ssa "
    } else {
        pre = ""
    }

    var fullname = pre + cognome + " " + nome

    //campi pag.2
    var nomePaziente = document.querySelector('input[name="name"]').value
    var taxCode = document.querySelector('input[name="taxcode"]').value
    var indirizzoPaziente = document.querySelector('input[name="address"]').value

    //campi pag.3
    var Ore = document.querySelector('input[name="Ore"]').value
    var Descrizione = document.querySelector('input[name="Descrizione"]').value
    var Unitario = document.querySelector('input[name="Unitario"]').value

    var Ore2 = document.querySelector('input[name="Ore2"]').value
    var Descrizione2 = document.querySelector('input[name="Descrizione2"]').value
    var Unitario2 = document.querySelector('input[name="Unitario2"]').value

    var Ore3 = document.querySelector('input[name="Ore3"]').value
    var Descrizione3 = document.querySelector('input[name="Descrizione3"]').value
    var Unitario3 = document.querySelector('input[name="Unitario3"]').value

    var INPS = document.querySelector('input[id="INPS"]').value
    var MarcaDaBollo = document.querySelector('input[id="MarcaDaBollo"]').value

    //campi pag.4
    var data = document.querySelector('input[name="Emissione"]').value 
    var dataFattura = data.split("-").reverse().join("-")
    var numFattura = document.querySelector('input[name="Numero"]').value

    //Calcoli
    var subtotal
    var totale
    var INPSper
    var INPSval
    var MarcaDaBolloVal

    if (INPS.value == true && MarcaDaBollo == true) {
        INPSper = 0.04
        MarcaDaBolloVal = 2
       } else if (INPS == true && MarcaDaBollo == false) {
        INPSper = 0.04
        MarcaDaBolloVal = 0
       } else if (INPS == false && MarcaDaBollo == true) {
        INPSper = 0
        MarcaDaBolloVal = 2
       } else {
        INPSper = 0
        MarcaDaBolloVal = 0 
       }

    //Calcolo totale
    subtotal = (Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3)
    INPSval = subtotal*INPSper
    totale = subtotal+INPSval+MarcaDaBolloVal

    //layout fattura
    // Aggiunge il numero e la data della fattura
    doc.setFont('helvetica');
    doc.setFontSize(30);
    doc.text(30, 30, "Fattura n." + numFattura + " del " + dataFattura);

    // Aggiunge i dati del professionista e del paziente alla fattura
    doc.setFontSize(14);
    doc.text(20, 50, "Professionista:");

    doc.setFontSize(11);
    doc.text(20, 60, fullname);
    doc.text(20, 70, tuoIndirizzo);
    doc.text(20, 80, "P. IVA:" + tuaPiva);

    doc.setFontSize(14);
    doc.text(120, 50, "Ricevente:");

    doc.setFontSize(11);
    doc.text(120, 60, nomePaziente);
    doc.text(120, 70, indirizzoPaziente);
    doc.text(120, 80, taxCode);

    // Disegna il riquadro per la marca da bollo
    doc.rect(100, 90, 60, 45);

    doc.autoTable({
        body: [
            ['Quantità', 'Descrizione', 'Prezzo'],
            [Ore, Descrizione, Unitario],
            [Ore2, Descrizione2, Unitario2],
            [Ore3, Descrizione3, Unitario3],
            [],
            ["","Subtotale:", "€ " + subtotal],
            ["","4% INPS:", "€ " + INPSval],
            ["", "Marca Da Bollo:", "€ " + MarcaDaBolloVal],
            ["", "Totale:", "€ " + totale]
            ],
        startY: 140,
        theme: 'grid',
                 })

    /*doc.text(30, 90, "Quantità");
    doc.text(65, 90, "Descrizione");
    doc.text(150, 90, "Prezzo Unitario");

    doc.text(30, 100, Ore);
    doc.text(100, 100, Descrizione);
    doc.text(150, 100, "€ " + Unitario);

    if (Ore2 != 0) {
        doc.text(30, 110, Ore2);
        doc.text(100, 110, Descrizione2);
        doc.text(160, 110, "€ " + Unitario2);
    } else {} 
    if (Ore3 != 0) {
        doc.text(30, 120, Ore3);
        doc.text(100, 120, Descrizione3);
        doc.text(160, 120, "€ " + Unitario3);
    } else {} 

    //Aggiunge il subtotale e l'importo della marca da bollo
    doc.text(100, 130, "Subtotale: " + subtotal + " €");
    doc.text(100, 140, "Marca da Bollo: " + MarcaDaBolloVal + " €");
    doc.text(100, 150, "Rivalsa INPS: " + INPSval + " €");
    doc.text(100, 160, "Totale Fattura: " + totale + " €");*/

    doc.setFontSize(8);
    doc.text(20, 250, "Operazione effettuata senza applicazione dell’IVA ai sensi dell’art.1, commi da 54 a 89, Legge n.190/2014 - Regime Forfettario.");
    doc.text(20, 260, "Si richiede la non applicazione della Ritenuta alla fonte a titolo di acconto come previsto dall’art. 1, comma 67, Legge n.190/2014.");
    doc.text(20, 270, "Imposta di Bollo sull’originale (per importi superiori ad €77,47).")

    //salva file con naming convention
    var filename = 'Fattura n.'+numFattura+' del '+dataFattura+', '+nomePaziente+'.pdf'
    doc.save(filename);
}
