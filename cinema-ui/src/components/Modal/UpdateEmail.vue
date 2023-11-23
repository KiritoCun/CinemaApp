<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="flex-column modal-header">
            <div class="modal-title">Thay đổi email</div>
            <div class="text-center">
              <p>Vui lòng cung cấp email mới, chúng tôi sẽ gửi mã xác thực cho bạn!</p>
            </div>
          </div>
          <div class="modal-body">
            <form class="password-form">
              <div class="form-group">
                <p class="mb-0">Email mới</p>
                <input type="password" class="password-input" placeholder="Nhập email mới" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Quay lại</button>
            <button type="button" class="btn btn-primary">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  padding: 7px;
  width: 430px;
  height: 439px;
}
.modal-container {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 10px;
  max-width: 700px;
  width: 100%;
  overflow: hidden;
}
.modal-header {
  justify-content: center;
  padding:  10px 10px 0px 10px;
}
.modal-footer {
  padding: 10px;
  background: #f9f9f9;
  border-bottom: 1px solid #e8e8e8;
}
.modal-body {
  padding: 12px 23px;
  border-bottom: 1px solid #e8e8e8;
}
.password-form {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.form-group {
  margin-bottom: 10px;
}

.password-input {
  width: 100%;
  padding: 10px;
  margin: 5px 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-title {
  margin: 0;
  font-size: 1.5em;
  font-weight: 700;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: transparent;
  font-size: 1.5em;
  cursor: pointer;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  margin-inline-start:5px;
}
.btn-secondary {
  background-color: #6c757d;
}
.btn-primary {
  background-color: #007bff;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
.btn-primary:hover {
  background-color: #0069d9;
}
</style>
