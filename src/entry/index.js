require('style/index.less');
import rect from 'modules/rect';
import event from 'modules/event';
import canDom from 'modules/canDom';
import cDom from 'modules/cDom';
import shape from 'modules/shape';

let can = document.querySelector('#can'),
    ctx = can.getContext('2d');

window.log = function() {};
// window.log = console.log;

// can.width = document.body.clientWidth - 50;
// can.height = document.body.clientHeight - 50;

rect(ctx);
event(ctx);
// canDom(ctx);

// window.tree = cDom('ele', {
//     id: 'main',
//     width: 1000,
//     height: 1000,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderStyle: 'solid',
// }, [
//     cDom('ele', {
//         id: 'layout',
//         width: 200,
//         height: 200,
//         backgroundColor: '#f00',
//     }, [
//         cDom('ele', {
//             className: 'nav1',
//             width: 200,
//             height: 200,
//             backgroundColor: '#0f9',
//         }, [
//             cDom('ele', {
//                 className: 'nav',
//                 width: 200,
//                 height: 200,
//                 backgroundColor: '#0f9',
//             }),
//         ]),
//         cDom('ele', {
//             className: 'nav1',
//             width: 200,
//             height: 200,
//             backgroundColor: '#0f9',
//         }, [
//             cDom('ele', {
//                 className: 'nav11',
//                 width: 200,
//                 height: 200,
//                 backgroundColor: '#0f9',
//             }),
//         ]),
//     ]),
//     cDom('ele', {
//         className: 'nav',
//         width: 200,
//         height: 200,
//         backgroundColor: '#090',
//     }, [
//         cDom('ele', {
//             className: 'nav1',
//             width: 200,
//             height: 200,
//             backgroundColor: '#0f9',
//         }, [
//             cDom('ele', {
//                 className: 'nav11',
//                 width: 200,
//                 height: 200,
//                 backgroundColor: '#0f9',
//             }),
//         ]),
//         cDom('ele', {
//             className: 'nav1',
//             width: 200,
//             height: 200,
//             backgroundColor: '#0f9',
//         }, [
//             cDom('ele', {
//                 className: 'nav11',
//                 width: 200,
//                 height: 200,
//                 backgroundColor: '#0f9',
//             }),
//         ]),
//     ]),
//     cDom('ele', {
//         className: 'nav1',
//         width: 200,
//         height: 200,
//         backgroundColor: '#0f9',
//     }),
// ]);

window.tree = cDom('ele', {
        id: 'main',
        width: 1000,
        height: 1000,
        borderWidth: 1,
        borderColor: '#333',
        borderStyle: 'solid',
    })
        .addChild([
            cDom('ele', {
                className: 'nav1',
            })
                .addChild([
                    cDom('ele', {
                        className: 'nav11',
                    }),
                    cDom('ele', {
                        className: 'nav11',
                    }),
                    cDom('ele', {
                        className: 'nav11',
                    })
                ])
        ])
        .addChild(cDom('ele', {
            className: 'nav1',
        }))
        .addChild(cDom('ele', {
            className: 'nav2',
        }));


let id = tree.attr('height', 800).attr('id');
console.log(tree);

tree.render(ctx);
