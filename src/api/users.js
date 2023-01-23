import requset from './request'

export const getUserList = (params) => {
    return requset({
        url: '/users',
        method: 'GET',
        params
    })
}