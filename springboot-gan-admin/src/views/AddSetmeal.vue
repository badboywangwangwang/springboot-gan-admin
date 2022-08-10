<template>
  <el-card class="addsetmeadl-container">
    <template #header>
      <div class="header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
      </div>
    </template>
    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickName" label="手机号"></el-table-column>

      <el-table-column label="会员等级">
        <template #default="scope">
          <span :style="scope.row.memberType != 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.memberType == 1 ? '初级会员' : scope.row.memberType == 2 ? '中级会员': scope.row.memberType == 3 ? '高级会员': scope.row.memberType == 4 ? '超级会员': scope.row.memberType == 5 ? '永久会员' : '非会员' }}
          </span>
        </template>
      </el-table-column>


      <el-table-column label="会员套餐">
        <template #default="scope">
          <span :style="scope.row.memberPay != 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.memberPay == 1 ? '月套餐' : scope.row.memberPay == 2 ? '季度套餐': scope.row.memberPay == 3 ? '半年套餐': scope.row.memberPay == 4 ? '年度套餐' : scope.row.memberPay == 5 ? '永久套餐' : '非会员' }}
          </span>
        </template>
      </el-table-column>


      <el-table-column prop="membershipDue" label="过期时间"></el-table-column>

      <el-table-column label="身份状态">
        <template #default="scope">
          <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.lockedFlag == 0 ? '正常' : '禁用' }}
          </span>
        </template>
      </el-table-column>


      <el-table-column label="是否注销">
        <template #default="scope">
          <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
            {{ scope.row.isDeleted == 0 ? '正常' : '注销' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="注册时间"></el-table-column>

    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
    />
  </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
export default {
  name: 'Addsetmeal',
  setup() {
    const multipleTable = ref(null)
    const state = reactive({
      loading: false,
      tableData: [], // 数据列表
      multipleSelection: [], // 选中项
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10 // 分页大小
    })
    onMounted(() => {
      getGuestList()
      console.log("------------")
    })

    // 添加分类
    const handleAdd = () => {
      state.type = 'add'
      addGood.value.open()
    }

    // 获取轮播图列表
    const getGuestList = () => {
      state.loading = true
      axios.get('/users', {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize
        }
      }).then(res => {
        console.log(res.list)
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
    }
    // 选择项
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    const changePage = (val) => {
      state.currentPage = val
      getGuestList()
    }

    const handleSolve = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
      }
      axios.put(`/users/0`, {
        ids: state.multipleSelection.map(item => item.userId)
      }).then(() => {
        ElMessage.success('解除成功')
        getGuestList()
      })
    }

    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      getGuestList,
      handleAdd,
      changePage,
      handleSolve
    }
  }
}
</script>

<style scoped>
.addsetmeadl-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100%!important;
}
</style>
