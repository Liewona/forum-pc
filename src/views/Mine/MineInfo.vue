<template>
  <div>
    <el-card>
      <div class="user-setting">
        <h3>基本信息</h3>
        <el-form :model="formInline" class="demo-form" ref="formInline" :label-position="labelPosition" label-width="80px" >
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/api/upload/"
              :show-file-list="false"
              :on-progress="progressUpload"
              :on-success="successRes"
              :before-upload="beforeAvatarUpload"
              accept="image/jpeg,image/gif,image/png,image/bmp"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="呢称">
            <el-input style="width:250px"
              v-model="formInline.username"
              placeholder="昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input style="width:250px"
              v-model="formInline.phonenum"
              placeholder="联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input style="width:250px"
              v-model="formInline.age"
              placeholder="年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="formInline.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="隐藏"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin-top: 150px">
            <el-button @click="onSubmit()">提交修改</el-button>
            <el-button type="primary" @click="dialogFormVisible = true"
              >修改密码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      center
      width="40%"
      append-to-body
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      formInline: {
        username: "",
        phonenum: "",
        useremail: ""
      },
      imageUrl: "",

      ruleForm: {
        pass: "",
        checkPass: ""
      },
      dialogFormVisible: false,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    successRes(response, file, fileList) {
      //文件上传成功之后
      //loading.close();r
      this.imageUrl = "http://localhost:8080/img/" + response.fileName;
      this.$message({
        message: response,
        type: "success"
      });
    },
    beforeAvatarUpload(file) {
      //文件上传之前
      console.log("afsdfasdfa");
      var isLt2M = file.size / 1024 / 1024 < 10;
      console.log(isLt2M);
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/updateUser", {
              userimg: this.imageUrl,
              userid: this.$store.state.userInfo.userid,
              phonenum: this.formInline.phonenum,
              username: this.formInline.username,
              useremail: this.formInline.useremail,
              loginpwd: this.ruleForm.pass
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg);
                // this.$router.replace({path: '/index'})
                this.$store.state.userInfo = res.data.obj;
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("修改失败");
              console.log("error submit!!");
            });
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      //移除图片
      console.log(file, fileList);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      this.$confirm("是否提交修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/updateUser", {
              userimg: this.imageUrl,
              userid: this.$store.state.userInfo.userid,
              phonenum: this.formInline.phonenum,
              username: this.formInline.username,
              useremail: this.formInline.useremail
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg);
                // this.$router.replace({path: '/index'})
                this.$store.state.userInfo = res.data.obj;
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("修改失败");
              console.log("error submit!!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style >
.user-setting {
  background: #fff;
  border-radius: 2px;
  padding: 10px 20px;
  min-height: 1080px;
}
.user-setting h3 {
  font-weight: 700;
  color: #515151;
  margin-bottom: 120px;
  text-align: left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>