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

![vau](https://github.com/JeroGra/ClincaOnline/assets/97103645/98c2a149-47df-433e-b9b3-cb5ea2d5d1a0)

El icono de usuario con el mas nos lleva a registrar un administrador, y el icono con el usuario y una lista nos lleva a una lista donde podremos habilitar o deshabilitar especialistas:

![var](https://github.com/JeroGra/ClincaOnline/assets/97103645/548b947a-b283-4a20-b92e-8dd646491ddb)

![vav](https://github.com/JeroGra/ClincaOnline/assets/97103645/3472cbba-02fd-4ba8-82dd-73579eecd572)

Aqui encontraremos la seccion de turnos: 

![vat](https://github.com/JeroGra/ClincaOnline/assets/97103645/51a86cdc-7d01-43aa-b9bc-6327430da64a)

El icono del la libreta/turno con un mas es para solicitar un turno a un paciente, y el icono de la libreta/turno con una X es para cancelar turnos:

Solicitar un turnos es muy sencillo y intuitivo.

Cancelar un turno tambien es muy sencillo y imtuitivo, a demas de que podemos filtrar turnos por Especialidad o Especialista para tener un resultado de busqueda mas eficaz:

![vact](https://github.com/JeroGra/ClincaOnline/assets/97103645/db565640-f430-4a69-abaa-cdbd40d8af18)





