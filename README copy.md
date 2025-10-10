## Inicialización del proyecto
- Instalar dependencias: `npm install`
- Ininicar instancia desarrollo: `npm run dev`
- Build : `npm run build` antes de pushear a staging
- Deploy: `firebase deploy --only hosting`

## Functions
- Instalar dependencias: `npm install`
- Iniciar emuladores: `firebase emulators:start`
- Deploy: `firebase deploy --only functions` (en el directorio de funciones)

## GIT
- Nomenclatura branches NW-XXXX-NOMBRE-DEL-FEATURE
- Nomenclatura commit NW-XXXX nombre del issue
- Nomenclatura hotfix [HOTFIX] descripcion del fix
- Pull requests: Al mergear un PR, se debe escribir en el changelog el nuevo feature

## Codigo
- Identar todo el codigo en 4 espaciados
- Auto identado: `shift + option + f`

## Testing
- Hest.js & React Testing Library
- to set up: https://www.youtube.com/watch?v=AS79oJ3Fcf0  
https://nextjs.org/docs/pages/building-your-application/testing/jest
- add yourComponent.test.js file unside tests folder and write the script of what you want to test
- then `run npm test`

## Librerias
- @mui/material
- @mui/icons-material
- @firebase/auth
- @firebase/database
- @testing-library/jest-dom

## Usuarios
#### SUPERADMIN
- email: superadmin@novaworks.io
- password: 123456

## Changelog - Stable builds
**XX/XX/2024 - 0.1**
- Setup Next + Firebase + CI/CD
- Layout
- Sidebar
- Login - Logout
- Sesion
- CRUD Empresas
- CRUD Proyectos
- CRUD Usuarios
- CRUD Tablas/filas
- Endpoint

## Endpoints
### GET Table Data
#### Argumentos
- companyId: string
- projectId: string
- tableId: string

#### URL ejemplo
`https://us-central1-xrs-panel.cloudfunctions.net/getTableData?companyId=-O9W92FYUSCLm9zxOZyq&projectId=-O9zvK_ODB_h4wwnSjeq&tableId=-OCnNRZp2EVF9eIQf24s`

### POST Table Data
#### Argumentos
- companyId: string
- projectId: string
- tableId: string

#### URL ejemplo
`https://us-central1-xrs-panel.cloudfunctions.net/postTableData`

#### Body ejemplo
```json
{
  "companyId": "-O9W92FYUSCLm9zxOZyq",
  "projectId": "-O9zvK_ODB_h4wwnSjeq",
  "tableId": "-OCnNRZp2EVF9eIQf24s",
  "data": {
    "Ambientes": 1,
    "Piso": 3,
    "Tipologia": 4
  }
}
```