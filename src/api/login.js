import requset from './request'

export const login = (data) =>{
    return requset({
        url: '/login',
        method: 'POST',
        data
    })
}