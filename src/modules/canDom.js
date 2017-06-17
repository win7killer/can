function init(ctx) {
    ctx.dom = ctx.dom || new Base();
    ctx.dom.add({
            id: 'ac_fun',
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            background: '#333',
        })
        // .add({
        //     className: 'ac_fun1',
        //     pos: {
        //         x: 100,
        //         y: 100
        //     },
        //     width: 200,
        //     height: 200,
        //     background: '#333',
        // }, '#ac_fun')
        .add([{
                id: '',
                className: 'ac_fun',
                x: 100,
                y: 100,
                width: 200,
                height: 200,
                background: '#444',
            },
            {
                id: '',
                className: 'ac_fun',
                pos: {
                    x: 100,
                    y: 100
                },
                width: 200,
                height: 200,
                background: '#555',
            }
        ], '#ac_fun')
        .add({
            className: 'cc',
            x: 12,
            y: 24,
            width: 120,
            height: 120,
        }, '#ac_fun .ac_fun');
    // console.log(ctx.dom);
    let ss = ctx.dom.find('#ac_fun .cc');
    console.log(ss);
    console.log(ctx.dom);

}

class Base {
    constructor(obj) {
        Object.assign(this, {
            children: {},
        }, obj);
        return this;
    }

    static addDOm(dom, parent) {
        // console.log('..........', parent);
        if (dom.id) {
            parent.children['#' + dom.id] = new CanDom(dom);
        } else if (dom.className) {
            let key = '.' + dom.className
            parent.children[key] = parent.children[key] || [];
            parent.children[key].push(new CanDom(dom));
        }
    }

    static fixCommond(fixType, fixVal, index) {
        // console.log('--------', fixVal, index);
        index += '';
        switch (fixType) {
            case 'eq':
                return fixVal === index;
                break;
            case 'lt':
                return fixVal > index;
                break;
            case 'gt':
                return fixVal < index;
                break;
            case 'neq':
                return fixVal != index;
                break;
            default:
                return false;
        }
    }

    static loopDom(map, arr, isAdd) {
        let result = [];
        let children = map.children;
        // console.log(map, arr, isAdd);

        let ele = arr[0] || '';
        let matchs = ele.match(/([\.\#][\w\d\-\_]+)(?:\:(eq|lt|gt|neq)\((\d+)\))?/) || [];
        // console.log(matchs);
        var [, pre, fixType, fixVal] = matchs;

        if (pre in children) {
            for (let k in children) {
                if (!children.hasOwnProperty(k)) continue;

                if (k == pre) {
                    // console.log(arr, children[k]);
                    arr.shift();
                    if (arr.length > 0 && children[k]) {
                        // console.log(1111);
                        if (children[k] instanceof Array) {
                            children[k].forEach((em, index) => {
                                // console.log('--------++++++++++', fixVal, index);
                                if (Base.fixCommond(fixType, fixVal, index)) {
                                    result.push(Base.loopDom(em, arr, isAdd));
                                }
                            });
                            return result;
                        } else {
                            return Base.loopDom(children[k], arr, isAdd);
                        }
                    } else {
                        // console.log(1111222);

                        return children[k];
                    }
                }
            }
        } else {
            for (let k in children) {
                // if (!children.hasOwnProperty(k)) continue;
                if (children[k]) {
                    if (children[k] instanceof Array) {
                        children[k].forEach(em => {
                            let res = Base.loopDom(em, arr, isAdd);
                            res && result.push(res);
                        });
                        return result;
                    } else {
                        let res = Base.loopDom(children[k], arr, isAdd);
                        if (res) {
                            return res;
                        }
                    }
                }
            }
        }
        // console.log(result, '-------');
        return result.length > 0 ? result : false;
    }

    find(path = '', isAdd) {
        let arr = path.split(' ');
        // console.log('mmmmmmm:', arr);
        let res = Base.loopDom(this, Object.assign([], arr), isAdd);
        // console.log('>>>>>>>>>>', arr, res);
        return arr.length > 0 ? res : false;
    }

    add(doms, parent) {
        if (parent) {
            let res = this.find(parent, true);
            // console.log('findres:', res);
            parent = res ? res : false;
        }
        parent = parent || this;
        // console.log('parent', parent);
        if (parent instanceof Array) {
            parent.forEach(em => {
                if (doms instanceof Array) {
                    doms.forEach(item => {
                        Base.addDOm(item, em);
                    })
                } else if (doms instanceof Object) {
                    Base.addDOm(doms, em);
                }
            })
        } else {
            if (doms instanceof Array) {
                doms.forEach(item => {
                    Base.addDOm(item, parent);
                })
            } else if (doms instanceof Object) {
                Base.addDOm(doms, parent);
            }
        }

        return this;
    }

}

class CanDom extends Base {
    constructor(obj) {
        super(obj);
        Object.assign(this, {
            id: '',
            path: '',
            className: '',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            background: '',
            border: '',
            position: '',
            children: {},
            zIndex: 1,
            noPointEvent: false,
        }, obj);
        return this;
    }
}

export default init;
