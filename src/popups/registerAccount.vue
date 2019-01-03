<template>
    <div class="g pop-up-inner">
        <div class="md toggle-aside">
            <a title="關閉" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>註冊</a>
        </div>
        <div class="g pop-up-content">
            <div class="g pop-up-content-inner">
                <div class="g form">
                    <div class="g fieldset">
                        <div class="cp input text" :class="[errors.has('account')? 'is-error': '']" :data-error="errors.first('account')">
                            <label for="account">帳號</label>
                            <input v-model="account" type="text" v-validate="'required|alpha_dash'" name="account" id="account">
                        </div>
                    </div>
                    <div class="g fieldset">
                        <div class="cp input email" :class="[errors.has('email')? 'is-error': '']" :data-error="errors.first('email')">
                            <label for="email">信箱</label>
                            <input v-model="email" type="email" v-validate="'required|email'" name="email" id="email">
                        </div>
                    </div>
                    <div class="g fieldset">
                        <div class="cp input text" :class="[errors.has('customerNumber')? 'is-error': '']" :data-error="errors.first('customerNumber')">
                            <label for="customerNumber">客戶代碼</label>
                            <input v-model="customerNumber" type="text" v-validate="'required|alpha_dash'" name="customerNumber" id="customerNumber">
                        </div>
                    </div>
                    <div class="g fieldset">
                        <div class="cp input text" :class="[errors.has('taxIdNumber')? 'is-error': '']" :data-error="errors.first('taxIdNumber')">
                            <label for="taxIdNumber">統一編號</label>
                            <input v-model="taxIdNumber" type="text" v-validate="'required|digits:8'" name="taxIdNumber" id="taxIdNumber">
                        </div>
                    </div>
                    <div class="g fieldset">
                        <div class="cp input password" :class="[errors.has('password')? 'is-error': '']" :data-error="errors.first('password')">
                            <label for="password">密碼</label>
                            <input v-model="password" type="password" v-validate="'required'" name="password" ref="password" id="password">
                        </div>
                    </div>
                    <div class="g fieldset">
                        <div class="cp input password" :class="[errors.has('passwordConfirm')? 'is-error': '']" :data-error="errors.first('passwordConfirm')">
                            <label for="passwordConfirm">確認密碼</label>
                            <input v-model="passwordConfirm" type="password" v-validate="'required|confirmed:password'" name="passwordConfirm" id="passwordConfirm">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary" @click.prevent="register">註冊</a></li>
                <li><a class="btn" @click.prevent="close">取消</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState([
                'user'
            ])
        },
        data: function(){
            return {
                account: null,
                email: null,
                customerNumber: null,
                taxIdNumber: null,
                password: null,
                passwordConfirm: null
            }
        },
        methods: {
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');
            },
            register: function(){

                this.$validator.validate().then(result => {
                    if (!result){
                        console.log('沒通過');
                    }else {
                        console.log('通過');
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .g.pop-up-inner {
        max-width: 320px;
    }

    .g.form {

        .input {
            width: 100%;
        }
    }

    label {
        width: 60px;
    }
</style>
