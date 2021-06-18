<template>
	<div class="layout-topbar">		
		<div class="inline-block mt--13">
			<div class="inline-block vertical-align-middle m--10">
				<router-link to="/">
					<img class="logo" src="http://android.app.quiktrak.eu/prestart-admin/resources/images/logo_big.png" alt="">
				</router-link>
			</div>			
			<div class="inline-block overflow-hidden" :style="media">
				<TabMenu :model="navItems">
				<template #item="{item}">
					<a :href="item.url">{{item.label}}</a>
				</template>
				</TabMenu>
			</div>
		</div>
		<div class="layout-topbar-icons inline-block">
			
			<!--<span class="layout-topbar-search">
				<InputText type="text" placeholder="Search" />
				<span class="layout-topbar-search-icon pi pi-search"></span>
			</span>-->
			<button class="p-link">
				<Button label="Admin" icon="icon icon-profile-name" :model="items" class="account-dropdown p-button-text p-mr-2 p-mb-2 p-button-md"></Button>
		
				<!--<span class="layout-topbar-icon icon icon-profile-name mx-10"></span>
				<span class="layout-topbar-item-text">User</span>-->
			</button>
		</div>
	</div>
</template>

<script>
import TabMenu from 'primevue/tabmenu'

export default {
	components: {
	  TabMenu
	},
	data(){
      return {
		navItems: [
			{label: 'Prestarts', icon: 'icon icon-menu-profile', to: '/'},
            {label: 'Trips', icon: 'icon icon-menu-trips', to: '/trips'},
            {label: 'Assets', icon: 'icon icon-other-asset', to: '/assets'},
            {label: 'Users', icon: 'icon icon-profile-name', to: '/employees'},
            {label: 'Faults', icon: 'icon icon-other-fail', to: '/faults'},
            {label: 'Checklists', icon: 'icon icon-other-checklist', to: '/checklists'},
            {label: 'Groups', icon: 'icon icon-other-passed-items', to: '/groups'},
            {label: 'Messages', icon: 'icon icon-other-notes', to: '/chat'},
            
		  ]
	  	}
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
	},
	computed:{
		media(){
			console.log(window.innerWidth)
			if(window.screen.width<880){
				return 'display:none';
			}else{
				return 'display:inline-block';
			}
		}
	}
}
</script>