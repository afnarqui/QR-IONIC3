ox=CREATEOBJECT("MSxml2.xmlhttp")
*!*	ox.open("post","http://localhost:4000/Auth",.F.)
*!*	ox.send("")
*!*	response = ox.responseText
*!*	XMLTOCURSOR(response ,"data",4)
*!*	SELECT data
*!*	BROWSE

IF !FEXEC("SELECT TOP 10 cedulasociado,pagare,plazo,saldocapital,estado FROM CREDITOS","data",.F.)
	GENERARERRORDECONEXION()
ENDIF 
SET STEP ON
************************************************ Reporteador **********************************************************************

CURSORTOXML("data","MiVar")
Mivar = STRTRAN(Mivar, '"', "'")

*!*	params = '{"data":"'+ Mivar +'","exportar":"pdf"}'
*!*	_cliptext = params
*!*	SET STEP ON
*!*	ox.open("post","http://localhost:3333/Auth",.F.)
*!*	ox.setRequestHeader("Content-type", "application/fox-pro")
*!*	ox.send(params)
*!*	reporte = ox.responseText
*!*	SET STEP ON

************************************************ Reporteador con Variables **********************************************************************

CREATE CURSOR TempVariables (nombreEntidad c(200),nombreasociado c(200),tipoproducto c(200) )
INSERT INTO   TempVariables (nombreEntidad ,nombreasociado ,tipoproducto ) VALUES ;
('Coonfie',"Sergio Arboleda","Credito")
CURSORTOXML("TempVariables","variables")
variables = STRTRAN(variables, '"', "'")

*!*	params = '{"data":"'+ Mivar +'","vars":"' + variables + '","exportar":"pdf"}'
*!*	_cliptext = params
*!*	ox.open("post","http://localhost:3333/Auth",.F.)
*!*	ox.setRequestHeader("Content-type", "application/fox-pro")
*!*	ox.send(params)
*!*	reporte = ox.responseText
*!*	SET STEP ON

************************************************ Reporteador con Variables y correo**********************************************************************

CREATE CURSOR TempEmail (para c(200),asunto c(200),texto c(200) )
INSERT INTO TempEmail (para,asunto,texto) VALUES ;
('sergiogeek7@gmail.com',"Reporte desde fox","esto es increhible .... mira el adjunto")
CURSORTOXML("TempEmail","Email")
Email = STRTRAN(Email , '"', "'")

params = '{"data":"'+ Mivar +'","vars":" ' + variables + ' ","email":" '+ Email + ' ","exportar":"txt"}'
_cliptext = params
ox.open("post","http://localhost:3333",.F.)
ox.setRequestHeader("Content-type", "application/fox-pro")
ox.send(params)
reporte = ox.responseText
SET STEP ON