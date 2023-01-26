<template>
    <el-dialog :model-value="dialogVisible" width="30%" :before-close="handleClose" :title="title">
        <el-form :model="form" label-width="70px" ref="formRef" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="title === '添加用户'">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="form.mobile" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup>
import { ref, reactive, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
// 更新dialogVisible值，使点击取消和确认都能实现关闭
const emits = defineEmits(['update:modelValue', 'initUserList'])
// 使用defineProps进行传值添加用户标题的修改
const props = defineProps(['title', 'dialogTable'])
const handleClose = () => {
    emits('update:modelValue', false)
}
// 添加校验规则
const rules = reactive({
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '输入正确邮箱', trigger: ['blur', 'change'] }
    ],
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
    ],
})
// 点击确认按钮
const formRef = ref(null)
const handleConfirm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            props.title === '添加用户' ? await addUser(form.value) : await editUser(form.value)
            // console.log(form.value)
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            handleClose()
            // 提交之后更新用户列表
            emits('initUserList')
        } else {
            console.log('error submit')
            return false
        }
    })
}
// 添加表单数据
const form = ref({
    username: '',
    password: '',
    email: '',
    mobile: ''
})
// 监听dialogTable的变化
watch(() => props.dialogTable, () => {
    // console.log(props.dialogTable)
    form.value = props.dialogTable

}, { deep: true, immediate: true })


</script>

<style>

</style>