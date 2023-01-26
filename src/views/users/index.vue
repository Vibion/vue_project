<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t(`table.placeholder`)" clearable v-model="queryForm.query">
        </el-input>
      </el-col>
      <!-- 搜索按钮 -->
      <el-button type="primary" :icon="Search" @click="initUserList">{{ $t(`table.search`) }}</el-button>
      <!-- 添加用户 -->
      <el-button type="primary" @click="hangleDialog()">{{ $t(`table.adduser`) }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" v-for="(item, index) in option" :key="index"
        :width="item.width">
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          <!-- <el-switch v-model="row.mg_state" /> -->
          {{ $filters.filterTimes(row.create_time) }}
          <!-- {{ showTime(row.create_time) }} -->
        </template>

        <template #default="{row}" v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="hangleDialog(row)"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteUser(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
  <Dialog v-model="dialogVisible" :title="title" v-if="dialogVisible" @initUserList="initUserList"
    :dialogTable="dialogTable"></Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUserList, changeUserState, deleteUser } from '@/api/users'
import { option } from "./option"
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filter'
import { ElMessage, ElMessageBox } from 'element-plus'

const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
// 总体的页数
const total = ref(0)
// 成员列表
const tableData = ref([])
// 初始化列表
const initUserList = async () => {
  const res = await getUserList(queryForm.value)
  // console.log(res)
  tableData.value = res.users
  total.value = res.total
  // const time = ref(showTime(res))
}
initUserList()

// 分页器的配置
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initUserList()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initUserList()
}

// 修改成员状态
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success',
  })
}
// 使用Props进行传值添加用户标题的修改
const title = ref('')
const dialogTable = ref({})
// 控制点击添加用户弹出对话框
const dialogVisible = ref(false)
const hangleDialog = (row) => {
  if (isNull(row)) {
    title.value = '添加用户'
    dialogTable.value = {}
  } else {
    title.value = '编辑用户'
    dialogTable.value = row
    // console.log(row)
  }
  dialogVisible.value = true
}
// 删除用户
const handleDeleteUser = async (row) => {
  ElMessageBox.confirm(
    '确认删除',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteUser(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      initUserList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

:deep(.el-pagination) {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
