import { defs as swaggerDefs, swagger } from "./swagger"

;(window as any).defs = {
  swagger: swaggerDefs
}
;(window as any).API = {
  swagger
}
