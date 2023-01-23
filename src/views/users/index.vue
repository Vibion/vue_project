<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t(`table.placeholder`)" clearable v-model="queryForm.query">
        </el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initUserList">{{ $t(`table.search`) }}</el-button>
      <el-button type="primary">{{ $t(`table.adduser`) }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" v-for="(item, index) in option" :key="index"
        :width="item.width">
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          <!-- <el-switch v-model="row.mg_state" /> -->
          {{ $filters.filterTimes(row.create_time) }}
          <!-- {{ showTime(row.create_time) }} -->
        </template>

        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUserList } from '@/api/users'
import { option } from "./option"


const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})

const total = ref(0)

const tableData = ref([])
const initUserList = async () => {
  const res = await getUserList(queryForm.value)
  // console.log(res)
  tableData.value = res.users
  total.value = res.total
  // const time = ref(showTime(res))
}
initUserList()

// const showTime = (val, format = "YYYY-MM-DD") => {
//     if (!isNull(val)) {
//         val = parseInt(val) * 1000
//         return dayjs(val).format(format)
//     } else {
//         return '--'
//     }
// }
// const time = showTime(tableData)


const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initUserList()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initUserList()
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
