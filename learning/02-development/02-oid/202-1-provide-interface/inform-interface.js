import { Oid } from '/lib/oidlib-dev.js'

Oid.cInterface ({
  id: 'exitf:inform',
  operations: ['arrive'],
  cardinality: 'n:n'
})