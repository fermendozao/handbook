---
templateKey: devs
date: 2018-12-12T23:49:48.396Z
title: Vinco Git Flow
---

## Descripción
En este documento se describe el flujo de contribución de los proyectos de Vinco Orbis en Github.

### Conceptos:
- **Tarea:** hacemos referencia a una tarea/ticket creada bajo la plataforma manoderecha.
- **Repositorio oficial:** repositorio oficial del proyecto de Vinco Orbis en Github.
- **Pull-request:** solicitud de integración de cambios.

## Guía de contribución
### Antes que nada se deben considerar los siguientes puntos:
- Todo proyecto debe de tener un repositorio bajo la cuenta de Github de Vinco Orbis. Si el proyecto no cuenta con un repositorio, solicitarlo.
- El proyecto debe de tener tres ramas:
  - Master: en esta rama se encuentra el código aprobado y desplegado en el ambiente de producción.
  - Staging: en esta rama se encuentra el código aprobado en espera para ser desplegado al ambiente de producción.
  - Development: en esta rama se encuentra el código desplegado en el ambiente de desarrollo, el cual está en revisión por el cliente en espera de ser aprobado.
- La persona que quiera contribuir con cambios a los repositorios oficiales necesita:
  - Contar con una cuenta en Github y tener activado el 2-step verification
  - Preferentemente pertenecer a  la organización de vinco
  - Solicitar permisos de lectura del repositorio oficial mediante una tarea de manoderecha.
  - Cada proyecto de git debe de contar con los archivos CONTRIBUTING.md y .PULL_REQUEST_TEMPLATE.md.
  - El repositorio debe de contener un archivo README.md que especifique todo lo necesario para correr el proyecto (paquetes, versiones, setup, etc).
  - Si tu pull-request presenta conflictos debes de actualizar tu rama mediante un git rebase upstream/staging.

### A continuación se enumeran los pasos a seguir para realizar una contribución:
1. Para contribuir al proyecto debes hacer un fork del proyecto de github de Vinco Orbis hacia tu cuenta y clonar el proyecto de tu repositorio.
2. Crear dos remotos, upstream (repositorio oficial) y origin (tu fork).
3. Realizar pull de la rama staging desde el repositorio oficial hacia tu rama staging.
4. Crear una rama a partir de la rama staging con el formato en Inglés `#tarea/descripción-de-la-tarea` el texto descriptivo debe de empezar con un verbo en imperativo.
   Ejemplos:
   - 000001/Add-login-endpoint
   - 000002/Create-user-controller
   - 000001/Add-user-template
5. Realizar cambios o correcciones solicitados en la tarea: agregar, modificar o eliminar archivos.
6. Realizar un commit por cada cambio funcional (no work in progress) con el formato en Inglés `etiqueta:Verbo en Texto descriptivo de la funcionalidad o cambio` el texto descriptivo debe de empezar con un verbo en imperativo. La etiqueta en el commit es opcional y no debe de sobrepasar los 78 caracteres.
   Ejemplos:
   - Add login endpoint.
   - 000001: Add login endpoint.
   - docs: Update readme file with builds commands.
**Nota:** en caso de usar etiquetas, estas deben de estar documentadas en el archivo CONTRIBUTING.md del repositorio.
7. Una vez terminados los cambios solicitados se hace un push de la rama a tu cuenta de github y se realiza un pull-request hacia la rama staging del repositorio oficial. Se debe de asegurar que el pull-request pase todas las pruebas, en caso contrario, se deben de realizar los cambios necesarios hasta que el pull-request pase las pruebas antes de continuar con el siguiente punto.
   - [Estructura del formato del pull-request.](Formatos%20de%20los%20pull-request.md#formatos-de-pull-request-de-solicitud-de-integración-hacia-la-rama-staging)
8. Integración en development: el líder técnico del proyecto revisa el pull-request bajando los cambios en su entorno de desarrollo local en la rama development, sí aprueba la revisión, se integran los cambios en la rama development del repositorio oficial y [se despliegan los cambios](../ci/Vinco%20CircleCI-Flow.md#deploy-a-desarrollo)
   - Si un pull-request tiene de 3 meses en adelante creado, este pull-request ya no es óptimo para integración, se tiene que volver a actualizar con los cambios de la rama staging o cerrarlo si ya no se es requerido.
9. Aprobación e integración en staging: el cliente o persona encargada de aprobar los cambios en desarrollo revisa la funcionalidad, si lo aprueba, el pull request es integrado en la rama staging del repositorio oficial y el código queda en espera a ser autorizado para ser desplegados a producción; si los cambios no son aprobados se solicita al desarrollador que repita los pasos del 4 al 7 hasta que el paso 9 sea aprobado.
10. Autorización del despliegue a producción e integración en master: una vez aprobado el despliegue de cambios a producción, se realiza un pull-request de la rama staging a la rama master el cual debe de contener la información del releases de los cambios a producción, el pull request es integrado en la rama master del repositorio oficial y [son desplegados los cambios en producción](../ci/Vinco%20CircleCI-Flow.md#deploy-a-producción)
    - [Estructura de formato del pull-request con la información del releases.](Formatos%20de%20los%20pull-request.md#formatos-de-pull-request-de-solicitud-de-integración-hacia-la-rama-master)