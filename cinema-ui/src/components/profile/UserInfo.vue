<template>
  <div class="card">
    <div class="card-body">
      <!-- No Labels Form -->
      <form class="row g-3">
        <div class="col-md-6">
          <p class="mb-2">Họ và tên</p>
          <input type="text" class="form-control readonly-input" placeholder="Họ và tên" :value="props.userInfoData.user_name" :disabled="readonly" />
        </div>
        <div class="col-md-6">
          <p class="mb-2">Ngày sinh</p>
          <input
            type="text"
            class="form-control readonly-input"
            placeholder="Ngày sinh"
            :value="formatDate(props.userInfoData.birthday)"
            :disabled="readonly"
          />
        </div>
        <div class="col-md-6">
          <p class="mb-2">Email</p>
          <div class="position-relative">
            <div class="flex-column">
              <input type="email" class="form-control readonly-input" placeholder="Email" :value="props.userInfoData.email " :disabled="readonly" />
              <button class="el-button change-button" @click.prevent="showModalEmail = true">Thay đổi</button>
              <UpdateEmailModal v-if="showModalEmail" @close="showModalEmail = false" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <p class="mb-2">Số điện thoại</p>
          <input
            type="text"
            class="form-control readonly-input"
            placeholder="Số điện thoại"
            :value="props.userInfoData.phonenumber"
            :disabled="readonly"
          />
        </div>
        <div class="col-md-6">
          <div>
            <b-form-group label="Giới tính" v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Male" :disabled="readonly"
                >Male</b-form-radio
              >
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Female" :disabled="readonly"
                >Female</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="col-md-6">
          <p class="mb-2">Mật khẩu</p>
          <div class="position-relative">
            <div class="flex-column">
              <input
                type="password"
                class="form-control flex-grow-1] readonly-input"
                placeholder="Mật khẩu"
                :value="props.userInfoData.password"
                :disabled="readonly"
              />
              <button class="el-button change-button" @click.prevent="showModalPassword = true">Thay đổi</button>
              <UpdatePasswordModal v-if="showModalPassword" @close="showModalPassword = false" />
            </div>
          </div>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary text-white">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import UpdatePasswordModal from '../Modal/UpdatePassword.vue';
import UpdateEmailModal from '../Modal/UpdateEmail.vue';

import { ref, defineProps } from 'vue';

interface UserInfoProps {
  userInfoData: {
    id: number;
    user_name: string;
    birthday: Date;
    email: string;
    phonenumber: string;
    sex: number;
    password: string;
  };
}
const props = defineProps<UserInfoProps>();

const selected = ref(props.userInfoData.sex === 0 ? 'Female' : 'Male');
const readonly = ref(true);
const showModalPassword = ref(false);
const showModalEmail = ref(false);

const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return '';
}
</script>

<style>
.readonly-input {
  background-color: #f2f2f2;
  color: #888;
}
.change-button {
  position: absolute;
  right: 0;
  margin-right: 7px;
  top: 8%;
}
</style>
