<template>
	<div class="p-grid">
		<div class="p-col-12 p-md-6">
			<div class="card p-fluid prf-card">
                <img class="prf-img" :src="'https://new.m2mdata.co/avatar.png?imageView2/1/w/80/h/80'" alt="">                           
                <div class="box-center align-center">
                    <div class="user-name text-center">TOP</div>
                    <div class="user-role text-center text-muted">ADMIN</div>
                </div>
            </div>  
        </div>
				<!--<user-card :user="user" />-->
			


		<div class="p-col-12 p-md-6">

			<div class="card">
                <TabView>
					<TabPanel header="Info">
						<div class="p-field p-fluid">
                            <label for="account">Account</label>
                            <InputText id="account" type="text" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="firstname">First Name</label>
                            <InputText id="firstname" type="text" v-model="firstname"/>
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="lastname">Last Name</label>
                            <InputText id="lastname" type="text" v-model="lastname" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="country">Country Code</label>
                            <InputText id="country" type="text" v-model="country"/>
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="email">Email</label>
                            <InputText id="email" type="text" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="phone">Phone</label>
                            <InputText id="phone" type="number" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
					</TabPanel>
                    <TabPanel header="Password">						
						<div class="p-field p-fluid">
                            <label for="currentpassword">Current Password</label>
                            <InputText id="currentpassword" type="password" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="newpassword">New Password</label>
                            <InputText id="newpassword" type="password" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
						<div class="p-field p-fluid">
                            <label for="confirmpassword">Confirm Password</label>
                            <InputText id="confirmpassword" type="password" />
                            <!--<small>Enter your username to reset your password.</small>-->
                        </div>
					</TabPanel>
				</TabView>
				
			</div>
		</div>

	</div>
</template>
<script>
    import UserCard from './profile/UserCard'

	export default {
        components: { UserCard },
		data() {
			return {
                firstname: 'TOP',
                lastname: 'ADMIN',
                country: 'AUS',
                user: {},
				dropdownItems: [
					{name: 'Option 1', code: 'Option 1'},
					{name: 'Option 2', code: 'Option 2'},
					{name: 'Option 3', code: 'Option 3'}
				],
				dropdownItem: null,
			}
		}
	}
</script>

<style>
    .prf-card{
        padding: 10% 20%;
    }
    .prf-img{
        width: 100%;
        min-width: 200px;
    }
    .box-center{
        text-align: center;
        font-size: 16px;
        line-height: 30px;
    }
    .user-name{
        font-weight: bold;
        font-size: 18px;
    }

    .user-role{
        color: grey;
    }

    .p-tabview-panels{
        padding: 0px !important;
        margin: 10px 0;
    }
</style>