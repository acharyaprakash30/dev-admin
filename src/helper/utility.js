/* eslint-disable no-unused-expressions */

let localStorage;

// // If we're testing, use a local storage polyfill
// if (global.process && process.env.NODE_ENV === 'test') {
//     localStorage = require('localStorage')
// } else {
//     // If not, use the browser one
// }
localStorage = window.localStorage

export function clearToken() {
    localStorage.removeItem('access_token');
}

function getTokenFromStorage(token = 'access_token') {
    return localStorage.getItem(token);
}

export function getToken(token = 'access_token') {
    try {

        return getTokenFromStorage(token)
    } catch (err) {

        clearToken();
        return {}
    }
}

export function getBearerToken() {
    if (getToken()) {
        return 'Bearer ' + getToken();
    }
    return false;

}

export const delay = (ms, value) => new Promise(res => setTimeout(res(value), ms))

export const getCategoryTree = (id, categoryList) => {
    let tree = []
    let parentId = id;
    function getId() {
        for (let category of categoryList) {
            if (category.id !== parentId) { //for level 2 category init
                category?.children?.length && category?.children.forEach((child) => {
                    if (child.id === id) { //for level 2 category save
                        tree.push(category.id)
                        tree.push(child.id)
                    }
                    else { //for level 3 category init
                        child?.children?.length && child.children.forEach((children) => {
                            if (children.id === id) { //for level 3 category save
                                tree.push(category?.name)
                                tree.push(child?.name)
                                tree.push(children?.name)
                            }
                            else {
                                children?.children?.length && children?.children?.forEach((children2) => {
                                    if (children2?.id === id) {
                                        tree.push(category?.name)
                                        tree.push(child?.name);
                                        tree.push(children?.name)
                                        tree.push(children2?.name);
                                    }
                                })
                            }
                        })
                    }
                })
            }
            else { //for level 1 category
                tree.push(category?.id)
            }
        }
    }
    getId();
    return tree;
};
