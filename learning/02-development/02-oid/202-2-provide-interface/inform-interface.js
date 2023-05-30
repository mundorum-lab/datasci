import { Oid } from '/lib/oidlib-dev.js'

Oid.cInterface ({
  id: 'exitf:inform',
  operations: {
    'arrive': {
      response: true,
      handler: 'someoneArrives'
    }
  },
  cardinality: 'n:n'
})