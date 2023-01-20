import requset from './request'

export const  menuList = () =>{
    return requset({
        url: '/menus',
        method: 'GET'

    })
}