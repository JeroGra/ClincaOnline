# ClinicaOnline ![logo_32x32](https://github.com/JeroGra/ClincaOnline/assets/97103645/31b771f4-6886-4cca-93f6-db3136f3492a)



Link: (https://clinicaonline-a3637.web.app)
Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1. Se utilizo servicios de firebase como firestore, storage, athenticator y hosting.

ClinicaOnline es una app web enfocada a los serivicios medicos de una clinica. Nos permite registrarnos como Especialista o como Paciente. El Especialista tendra acceso a herramientas utiles para la gestion de sus turnos online, por otro lado el Paciente tendra acceso a herramientas que le permitan solicitar turnos desde la comodidad de su hogar a travez de la app web.
ClinicaOnline busca facilitarle el trabajo a los profesionales , y a los pacientes darle una forma mas comoda de buscar atencion medica.

# Como Ingresar y Registrarme

Lo primero que veremos al ingresar al link de la app web sera: 

![b](https://github.com/JeroGra/ClincaOnline/assets/97103645/48352fea-150c-4316-84e4-a2cc941b4100)

Si elegimos ingresar nos llevara a una pagina clasica de inicio de sesion:

![l](https://github.com/JeroGra/ClincaOnline/assets/97103645/15dc48b7-9763-48bb-85d9-2f66c8907ad9)

Si elegimos registrarme nos llevara a una pagina donde veremos dos botones redondos con iconos/imagenes que hacen referencia al tipo de usuario que registraremos:

![r](https://github.com/JeroGra/ClincaOnline/assets/97103645/27afe9e4-0098-4c71-b917-e15f007512c6)

El boton que esta rodeado por un circulo rojo en la imagen es el que deberiamos pulsar para registrar un especialista, el otro para un paciente.

Registro especialista:

![re1](https://github.com/JeroGra/ClincaOnline/assets/97103645/e43a538e-f2ef-47c9-9b72-867b9b4fd6c9)


Como vemos en este registro tendremos un formulario con datos necesarios para la carga del especialista, a su vez tambien se solicitara las Especialidades del especialista. Estas especialidades ya estan cargadas y basta con pulsar el boton de la especialidad para que se agregue, si esta en verde es que esta seleccionada y si esta en blanco es que no, eso se puede apreciar en la imagen.
Sin embargo hay una opcion extra que se puede ver que es seleccionar en especialidades "Otra", si pulsamos ese boton nos habilitara un campo a rellenar con el nombre de una especialdiad
que no este en la lista anterior y asi podremos agregar solo Una especialidad nueva faltante:

![re2](https://github.com/JeroGra/ClincaOnline/assets/97103645/c8155a74-91b8-4f72-801a-2b1c8029b347)

Registro paciente:

![rp1](https://github.com/JeroGra/ClincaOnline/assets/97103645/940628f1-c9c0-4d67-bc56-401be0f4fee2)

El registro del paciente es muy sencillo y intuitivo.

Para poder completar los registros efectivamente tendremos que no solo cumplir con todos los datos requeridos, sino que tambien tendremos que validar el captcha:

![rr](https://github.com/JeroGra/ClincaOnline/assets/97103645/022cc219-63e9-4e1e-ae91-369071d14285)

Esto es obligatorio en todos los casos. Una vez registrados recibiremos un mail de verificacion de email. En el caso del Especialista no bastara con la verificacion del email para ingresar, sino que tambien tiene que ser validado por un administrador.


# Vista Administrador

Inicio/Perfil: 

![vap](https://github.com/JeroGra/ClincaOnline/assets/97103645/3f2f3901-73b9-4b89-9fd0-46dc32b70c79)

El administrador tiene como funciones las siguientes: 
- Registrar otro Administrador.
- Habilitar/Deshabilitar cuentas de Especialistas.
- Cancelar Turnos.
- Solicitar turnos para pacientes.

Aqui encontraremos la seccion de usuarios: 

![CapturaAV](https://github.com/JeroGra/ClincaOnline/assets/97103645/d716eb41-6749-4124-b815-455ee9a78236)

El icono de usuario con el mas nos lleva a registrar un administrador, el icono con el usuario y una lista nos lleva a una lista donde podremos habilitar o deshabilitar, 
y el icono de calendario con un corazón nos lleva a ver las Historias Clinicas de los pacientes realizadas por los especialistas registrados en el sistema

![var](https://github.com/JeroGra/ClincaOnline/assets/97103645/548b947a-b283-4a20-b92e-8dd646491ddb)

![vav](https://github.com/JeroGra/ClincaOnline/assets/97103645/3472cbba-02fd-4ba8-82dd-73579eecd572)

Aqui encontraremos la seccion de turnos: 

![vat](https://github.com/JeroGra/ClincaOnline/assets/97103645/51a86cdc-7d01-43aa-b9bc-6327430da64a)

El icono del la libreta/turno con un mas es para solicitar un turno a un paciente, y el icono de la libreta/turno con una X es para cancelar turnos:

Solicitar un turnos es muy sencillo y intuitivo.

Cancelar un turno tambien es muy sencillo y imtuitivo, a demas de que podemos filtrar turnos por Especialidad o Especialista para tener un resultado de busqueda mas eficaz:

![vact](https://github.com/JeroGra/ClincaOnline/assets/97103645/db565640-f430-4a69-abaa-cdbd40d8af18)

Tambien encontraremos la seccion de estadisticas/graficos del sistema:

![Captura2](https://github.com/JeroGra/ClincaOnline/assets/97103645/4d02db1d-154f-44e4-8406-dca77a44c055)

El icono de las barritas/graficos nos llevara a la pagina donde veremos los Logs del sistema y los graficos estadisticos de los turnos
de la Clinica:

![logs](https://github.com/JeroGra/ClincaOnline/assets/97103645/73b0fbd6-23ef-4fe9-a7a9-958bdd0a2b24)

Aqui veremos los logs, podemos descargar la tabla en formato XLSX (Excel) pulsando el boton que esta debajo de los logs o 
aretando la tecla Enter.

![graf](https://github.com/JeroGra/ClincaOnline/assets/97103645/d7cf2b9d-c037-4bdc-b065-0da6786c4ea6)


Aqui vemos los graficos estadisticos de los turnos, el primero es sobre Turnos por Especialidad, si tocamos el icono  del calendario que
dice FRI (dia de la semana) veremos el grafico pero con turnos segun dia de habil de la semana y si seleccionamos el icono con el calendario y un + (mas) podremos filtrar turnos por una fecha de inicio y fin seleccionada y ver dentro de esa fecha turnos finalizados
por especialista o turnos solicitados por especialista (en estado solicitado actual). Podemos navegar entre los graficos usando las teclas de flecha a la izquiera ⬅ y felcha a la derecha ➡ del teclado, tambien podemos descargar un Excel del grafico que estamos viendo en el momento apretando el boton que esta debajo del grafico.

Dato extra: Si apretamos la tecla Escape en esta seccion nos mandara a la Seccion Mi Perfil del Administrador.



# Vista Especialista

inicio/Perfil: 

![ve](https://github.com/JeroGra/ClincaOnline/assets/97103645/eb21d0cc-969b-45ca-9d49-bdf72d1547f5)

Como vemos no cambia mucho respecto a los demas tipos de usuarios, solo que encontraremos un boton con un iconod e reloj para seleccionar la franja horaria de trabajo del especialista:

![veh](https://github.com/JeroGra/ClincaOnline/assets/97103645/13d8a939-2549-4a8a-9ec8-f1342c53f797)

Podremos seleccionar la franja horaria de trabajo del especialista de cada dia exepto la de los domingos que no se considera dia habil en
nuestra ClinicaOnline. Con esta franja horaria podremos generar los turnos con horarios aproximados dentro de la franja horaria seleccionada de dicho dia.

Luego en la barra superior de la app web tendremos el icono de la libreta/turno que si lo pulsamos nos llevara a la administracion de turnos del especialista:

![vet](https://github.com/JeroGra/ClincaOnline/assets/97103645/2b8442e2-0d4f-4c6b-b5d2-fc03a7bf8f93)


![ea](https://github.com/JeroGra/ClincaOnline/assets/97103645/8b59867a-cbdf-48a3-b840-fdbb2f6214cf)

Como vemos aqui veremos todos los turnos relacionados al especialista que estan Solicitados/Tomados/Finalizados
podemos visualizar su estado facilmente. Segun su estado podremos realizar acciones:

Si esta Solicitado veremos dos botones:
- El boton verde con un icono de un turno con un + nos permite aceptar el turno
- El boton amarillo con un icono de un turno con un - nos permite rechazar el turno y dar su motivo.

Si esta Tomado veremos dos botones:
- El boton azul con un icono de un turno y un check o tilde ✔ nos permite finalizar el turno y a la vez dejar la reseña y generar la historia clinica de dicho turno.
- El boton rojo con un icono de un turno y una equis ❌ nos permite cancelar el turno y dejar el motivo.
  

Por ultimo tendremos un boton rosa con un icono de un turno y lineas de frecuencias cardiacas que nos permitira ver los detalles de
los turnos finalizados:

![eee](https://github.com/JeroGra/ClincaOnline/assets/97103645/3300f191-188c-4d93-9aac-88db8ef35996)


En la barra de acceso del Especialista tambien encontraremos una seccion pacientes donde podremos seleccionar el icono de un calendario
con un corazón para ver las historias clinicas de los pacientes atendidos:

![ee](https://github.com/JeroGra/ClincaOnline/assets/97103645/7c14ece2-e5ef-4087-a204-fc23d25f5221)


# Vista Paciente

inicio/prefil:

![vp](https://github.com/JeroGra/ClincaOnline/assets/97103645/214efdcd-904b-405f-bed9-f25ae98f6a60)

Turnos:

![vpt](https://github.com/JeroGra/ClincaOnline/assets/97103645/2c3c40d1-9517-42b7-ad6d-41689b558fcf)

El icono con una libreta/turno con un mas nos lleva a solicitar un turno.
El icono con una libreta/turno con un grafico de barras nos lleva a ver nuestros turnos solicitados y finalizados para realizar acciones:

![vptt](https://github.com/JeroGra/ClincaOnline/assets/97103645/12672935-1809-414c-9ea2-7dfc2ce10101)

- El turno con una crux o X nos permite cancelarlo al igual que un especialista o administrador.
- El turno con un corazon nos permite ver la reseña realizada por el profesional de un turno finalizado.
- El turno con un simbolo de correcto nos permite realizar la encuesta para un turno.
- La libretita con una lapicera nos permite dejar un comentario sobre la atencion del especialista de un turno finalizado.

