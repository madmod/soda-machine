window.board = window.Relay.prototype.board = { pinMode: function () { console.log('pinMode', arguments) }, digitalWrite: function () { console.log('digitalWrite', arguments) } }
