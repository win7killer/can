import render from 'modules/render';

class CDom {
    constructor(tag, props, children = []) {
        const defaultProps = {
            id: '',
            className: '',
            width: '',
            height: '',
            zIndex: '',
            color: '',
            fontSize: '',
            fontWeight: '',
            position: '',
        };
        this.tag = tag; // 暂时分为两种，ele和group
        if (props instanceof Array) {
            this.props = Object.assign({}, defaultProps, {});
            this.children = props;
        } else {
            this.props = Object.assign({}, defaultProps, props || {});
            this.children = children || [];
        }
        this.id = this.props.id;
        this.className = this.props.className;
        return this;
    }
    addChild(arr) {
        if (arr instanceof Array) {
            this.children = this.children.concat(arr);
        } else if (arr instanceof Object) {
            this.children.push(arr);
        }
        return this;
    }
    getChildren(index) {
        return index === undefined ? this.children : this.chindren[index];
    }
    attr(prop, val) {
        if (prop) {
            if (val === undefined) { // get
                return this.props[prop];
            } else { // set
                this.props[prop] = val;
                return this;
            }
        } else {
            return this.props;
        }
    }
    /**
     * id查询
     * @param
     *  @str | String | query字符串 | ex: '#id'
     *  @isDeep | Boolean | 是否为程序调用,手动调用请勿传该参数
     * @return CDom对象 || undefined
     */
    findById(str, isDeep) {
        if (!isDeep) {
            console.time();
        }
        let res;
        for (let item of this.children) {
            if (item.id === str.replace('#', '')) {
                res = item;
                break;
            } else if (item instanceof CDom) {
                res = item.findById(str, true);
                if (res) {
                    break;
                }
            }
        }
        if (!isDeep) {
            console.timeEnd();
        }
        return res;
    }
    /**
     * 单个class查询
     * @param
     *  @str | String | query字符串 | ex: '.class1 [.class2]' | 【must】
     *  @isDeep | Boolean | 是否为程序调用,手动调用请勿传该参数
     *  @loopArr | Array | 查询限制范围，手动查询是请勿传该参数
     * @return Array【包含CDom对象的数组】|| []
     */
    findByClassName(str, isDeep = false, loopArr = this.children) {
        if (!isDeep) {
            console.time();
        }
        log('=========', loopArr);
        let res = [];
        loopArr.forEach((item, index) => {
            let temp = [];
            let cName = item.className.trim();
            let cNames = cName ? cName.split(/\s+/) : [];
            for (let em of cNames) {
                if (em === str.replace('.', '')) { // 匹配到classname
                    log(em, '---', str.replace('.', ''));
                    temp.push(item);
                    break;
                }
            }
            let result = item.findByClassName(str, true);
            temp = temp.concat(result);
            res = res.concat(temp);
        })
        if (!isDeep) {
            console.timeEnd();
        }
        return res;
    }
    /**
     * 纯class串查询,仅对class串做loop循环处理，最终调用findByClassName
     * @param
     *  @str | String | query字符串 | ex: '.class1 [.class2]' | 【must】
     *  @isDeep | Boolean | 是否为程序调用,手动调用请勿穿该参数
     *  @loopArr | Array | 查询限制范围，手动查询是请勿传该参数
     * @return Array【包含CDom对象的数组】|| []
     */
    findByccName(str, isDeep = false, loopArr) {
        log(str, '--------->', loopArr)
        if (!isDeep) {
            console.time();
        }
        let res = [];
        let temp = loopArr || [];
        let arr = str.trim() ? str.trim().split(/\s+/) : [];

        if (arr.length === 0) return res;

        arr.forEach((item, index) => {
            if (index === 0) {
                temp = this.findByClassName(item, true, loopArr);
            } else {
                temp = this.findByClassName(item, true, temp);
            }
        });

        res = temp;
        if (!isDeep) {
            console.timeEnd();
        }
        return res;
    }
    /**
     * 统一接口 find
     * @param
     *  @str | [String] | query字符串， 支持id，class查询 |
     *      ex: '#id [.className [.className1]]' 或 '.className [.className1]'
     * @return CDom对象 || undefined || Array【包含CDom对象的数组】|| []
     */
    find(str) {
        console.time();
        str = str.trim().replace(/[a-z0-9\-\_\s]+\#/, '#');
        let res = [];
        let temp = [];
        let arr = str.split(/\s+/);
        if (str.indexOf('#') === 0) { //id开头
            let result = this.findById(arr[0], true); // 获取到id节点
            if (arr.length > 1) { // id组合class查询
                temp = result ? result.children : []; // temp为后边class查询的限制范围
                log('.......', temp);
                res = this.findByccName(str.replace(arr[0], '').trim(), true, temp);
            } else { // 纯id查询
                res = result;
            }
        } else if (str.indexOf('.') === 0) { // 纯class查询
            res = this.findByccName(str, true);
        }
        // res = temp;
        console.timeEnd('all');
        return res;
    }
    // static findChild(str, type, data, arr) {
    //     let children = data.children || [];
    //     if (type === 'id') {
    //         let res;
    //         for (let item of children) {
    //             log(str, type, data, item.id);
    //             if (item.id === str) {
    //                 log(str);
    //                 res = item;
    //                 break;
    //             }
    //         }
    //         return res;
    //     } else if (type === 'class') {
    //         let res = [];
    //         children.forEach((item, index) => {
    //             if (item.className === str) {
    //                 res.push(item);
    //             }
    //             this.find(arr, )
    //         });
    //         return res;
    //     }
    // }
}

CDom.prototype.render = render;

export default function(tag, props, children) {
    return new CDom(tag, props, children);
}
