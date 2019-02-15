class EventEmitter {
    constructor() {
        this._events = Object.create(null)
    }
    on(name, callback) {
        let isHas = !!this._events[name]
        if(!isHas) {
            let fns = []
            fns.push(callback)
            this._events[name] = fns 
        } else {
            this._events[name].push(callback);
        }
    }
    off(name, fn) {
        let isHas = !!this._events[name]
        if(!isHas) {
            console.log('尚未订阅')
        } else {
            if (!fn) {
                delete this._events[name];
                return this;
            } else {
                let index = this._events[name].indexOf(fn)
                if(index > -1) {
                    this._events[name].splice(index, 1)
                }
            }
        }
    }
    emit(name, ...args) {
        let fns = this._events[name]
        let isHas = !!fns
        if(isHas) {
            for (let i = 0; i < fns.length; i++) {
              fns[i](...args)    
            }
        }
    }
}
// 测试
var a = new EventEmitter();
a.on('hello', function(params) {
    console.log("hello, "+ params)
})
a.on('hello', function(params) {
    console.log("hello, 又订阅了一次"+ params)
})
a.emit('hello', 'i love you')
a.off('hello')
a.emit('hello', 'i hate you')
a.on('hello', function(params) {
    console.log("hello, "+ params)
})
a.emit('hello','i love you again')