import requset from './request'
// 获取用户列表
export const getUserList = (params) => {
    return requset({
        url: '/users',
        method: 'GET',
        params
    })
}
// 点击开关修改用户状态
export const changeUserState = (id, type) => {
    return requset({
        url: `/users/${id}/state/${type}`,
        method: 'PUT',
    })
}
// 添加用户
export const addUser = (data) => {
    return requset({
        url: `/users`,
        method: 'POST',
        data
    })
}
// 编辑按钮编辑用户
export const editUser = (data) => {
    return requset({
        url: `users/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除用户
export const deleteUser = (id) => {
    return requset({
        url: `users/${id}`,
        method: 'DELETE',
    })
}