<template>
	<div :class="containerClass" @click="onWrapperClick">
		<AppTopBar :info="info" @menu-toggle="onMenuToggle" v-show="!showLogin" />

		<Toast />
        
        <transition name="layout-sidebar">
            <div :class="sidebarClass" @click="onSidebarClick" v-show="false"> <!--removed isSidebarVisible()-->
                <div class="layout-logo">
                    <router-link to="/">
                        <img alt="Logo" :src="logo" />
                    </router-link>
                </div>

                <AppProfile />
                <AppMenu  :info="userInfo" :model="menu" @menuitem-click="onMenuItemClick" />
            </div>
        </transition>

		<div class="layout-main">
			<router-view :info="userInfo" v-show="!showLogin"/>
		</div>

		<AppFooter />

        <Sidebar v-model:visible="showLogin" class="login" :baseZIndex="1000" position="bottom">
            <div class="layout-profile">
                <div>
                    <img class="logo_big" src="http://android.app.quiktrak.eu/prestart/static/images/logo.png" alt="">
				</div>
                <div class="login-form p-fluid p-formgrid p-grid align-left">
                    <div class="p-field p-col-12">
                        <label for="username" class="text-color-white">Login Name</label>
                        <InputText id="username" v-model="loginForm.username"  type="text" placeholder="Enter Login/E-mail"/>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="password"  class="text-color-white">Password</label>
                        <InputText id="password" v-model="loginForm.password" type="password" placeholder="Enter Password"/>
                    </div>
                    <div class="p-field p-col-6">
                        <Button label="Registration" class="white-btn mt-30 w-100 p-button-lg uppercase"/>
                    </div>
                    <div class="p-field p-col-6 align-right">
                        <Button label="Login"  @click="onLogin" class="p-button-danger mt-30 w-100 p-button-lg uppercase"/>
                        
                    </div>
                </div>
            </div>
        </Sidebar>
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppProfile from './AppProfile.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
import { login } from '@/api/user'

export default {
    data() {
        return {
            loginForm: {
                /*Account: !localStorage.Account ? '' : localStorage.Account,
                Password: !localStorage.Password ? '' : localStorage.Password,
                AppID: 'com.quiktrak.new.web',
                PushToken: '',
                SystemType: PlatformTypes[detectNavigatorAgentType()]*/
                username: !localStorage.Account ? '' : localStorage.Account,
                password: !localStorage.Password ? '' : localStorage.Password,
                AppKey: '924365a6-eadd-3742-ed83-7d55f37b0503',
                MobileToken: '832f2ce8-8864-5228-8648-1b1cb95d826e',
                DeviceToken: '832f2ce8-8864-5228-8648-1b1cb95d826e',
                DeviceType: 'android.app.quiktrak.eu.prestart'
            },
            userInfo: {},
            showLogin: true,
            layoutMode: 'overlay',
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            //this.$toast.removeAllGroups();
        }
    },
    methods: {
        async onLogin() {
            //this.loading = true
            let response = await login(this.loginForm)
            //this.loading = false
            if(!response){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'Something happened', life: 3000});
                return
            }
            console.log('rsp', response)
            this.showLogin = false
            this.userInfo = response
            localStorage.Account = this.loginForm.username;
            localStorage.Password = this.loginForm.password;
        },
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
		onLayoutColorChange(layoutColorMode) {
			this.layoutColorMode = layoutColorMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth > 1024;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
                else
                    return true;
            }
            else {
                return true;
            }
        },
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$appState.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        sidebarClass() {
            return ['layout-sidebar', {
                'layout-sidebar-dark': this.layoutColorMode === 'dark',
                'layout-sidebar-light': this.layoutColorMode === 'light'
            }];
        },
        logo() {
            return (this.layoutColorMode === 'dark') ? "assets/layout/images/logo-white.svg" : "assets/layout/images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppProfile': AppProfile,
        'AppMenu': AppMenu,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
