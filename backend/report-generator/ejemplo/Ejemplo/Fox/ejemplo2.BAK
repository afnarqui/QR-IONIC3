IF !FEXEC("SELECT A.CODLINEA as CodigoLinea,B.NOMBRE as Nombre,A.CODCUENTA as CodigoCuenta,A.CODCUENTAINGRESOCORRIENTES cuentacorriente," +;
"A.CODCUENTAINGRESOSMORA as cuentamora FROM LINEAS A WITH(NOLOCK), PLANCUENTAS B WITH(NOLOCK) WHERE A.CODCUENTA = B.CODCUENTA ","Tmpdatos",.F.)
	GENERARERRORDECONEXION()
ENDIF 

thorasistema = TIME()

SELECT COUNT (1) AS totalregistros,TTOD(dfechatrabajo) as fechatrabajo,DATE() as fechasistema, thorasistema  as horasistema,ALLTRIM(cNombreCompañia)+ " -- " + ALLTRIM(cNomAgencia) as nombreagencia,;
' INFORME LINEAS MATRICULADAS ' as nombreinforme;
FROM Tmpdatos INTO CURSOR Tempvariables READWRITE 

************************************ Parametros Reporte ********************************************************
CURSORTOXML("Tmpdatos","datos")
datos= STRTRAN(datos, '"', "'")

CURSORTOXML("Tempvariables","variables")
variables= STRTRAN(variables, '"', "'")

params = '{"data":" '+ datos +' ","vars":" ' + variables+ ' ","exportar":"pdf"}'
*********************************** Consultar webService *****************************************************
ox=CREATEOBJECT("MSxml2.xmlhttp")
ox.open("post","http://localhost:3333",.F.)
ox.setRequestHeader("Content-type", "application/fox-pro")
ox.send(params)
reporte = ox.responseText
SET STEP ON