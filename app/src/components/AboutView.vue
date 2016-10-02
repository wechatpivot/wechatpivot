<style>
.About {
  padding-left: 60px;
}

.About h1 {
  margin-top: 30px;
}
.About-logo {
  width: 100%;
}
.About-github {
  margin-top: 15px;
  text-align: center;
}
</style>

<template>
  <div class="About">
    <h1>Contributors</h1>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content"><img class="About-logo" src="./AboutView/assets/avatar-hbrls.jpg" alt="hbrls"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content About-github">@hbrls</div>
      </el-col>
    </el-row>
    <h1>Powered by</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content"><img class="About-logo" src="./AboutView/assets/logo-electron-vue.png" alt="electron-vue"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"><img class="About-logo" src="./AboutView/assets/logo-element.png" alt="element"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content About-github">@SimulatedGREG/electron-vue</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content About-github">@ElemeFE/element</div>
      </el-col>
    </el-row>
    <h1>MIT License</h1>
  </div>
</template>

<script>
  export default { }
</script>
