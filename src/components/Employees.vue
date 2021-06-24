 <template>
<div class="p-grid p-fluid prestarts">
	<Dialog v-model:visible="isAddEmployeeModalOpened" class="m-dialog">
		<template #header>
			<h3>Add new employee</h3>
		</template>

		<div class="p-grid">
			<div class="p-col-12 p-md-12">
				<div class="card p-fluid">
					<div class="p-fluid p-formgrid p-grid">
						<div class="p-field p-col-6">
							<label for="name2">First Name</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Sur Name</label>
							<InputText id="email2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="name2">Mobile</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Phone</label>
							<InputText id="email2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="name2">E-mail</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Role</label>
							<Dropdown v-model="selectedChecklist" :options="checklists" optionLabel="name" optionValue="code" :placeholder="'Select role'" class="" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<template #footer class="align-left">
			<Button label="Create new employee" class="dark-btn mt-30 wl-100 p-button-md uppercase" autofocus />
		</template>
	</Dialog>



	<Dialog v-model:visible="isEditEmployeeModalOpened" class="m-dialog">
		<template #header>
			<h3>Edit details</h3>
		</template>

		<div class="p-grid">
			<div class="p-col-12 p-md-12">
				<div class="card p-fluid">
					<div class="p-fluid p-formgrid p-grid">
						<div class="p-field p-col-6">
							<label for="name2">First Name</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Sur Name</label>
							<InputText id="email2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="name2">Mobile</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Phone</label>
							<InputText id="email2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="name2">E-mail</label>
							<InputText id="name2" type="text" />
						</div>
						<div class="p-field p-col-6">
							<label for="email2">Role</label>
							<Dropdown v-model="selectedChecklist" :options="checklists" optionLabel="name" optionValue="code" :placeholder="'Select role'" class="" />
						</div>
						<div class="p-field p-col-6">
							<div class="p-fluid p-formgrid p-grid">
								<div class="p-field p-col-6">
									<label for="name2">Rating</label>
									<Rating  v-model="ratingValue" :cancel="false"/>
								</div>
								<div class="p-field p-col-6  pt-25">
									<Button label="Reset" :model="items" class="uppercase p-button-danger p-mr-2 p-mb-2 p-button-sm"></Button>
								</div>
							</div>
						</div>
						<div class="p-field p-col-6 pt-25" >
							<i>When you click the button, the driver's rating will be ubdated to the original (zero)</i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<template #footer class="align-left">
			<Button label="Save details" class="dark-btn mt-30 wl-100 p-button-md uppercase" autofocus />
		</template>
	</Dialog>
	
	
	<form class="p-grid p-fluid w-form mb-15 mt-10" @submit.prevent="loadLazyData">        
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3">
        <label>Roles</label>
        <Dropdown v-model="selectedChecklist" :options="checklists" optionLabel="name" optionValue="code" :placeholder="'All roles'" class="" />
      </div>
      <div class="p-col" >
		
      </div>
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3">
        <label>Search</label>
        <div class="p-inputgroup">
          <InputText placeholder="Enter employee name..."/>
          <Button icon="pi pi-search" class="p-button-warning bg-lightgrey"/>
        </div>
      </div>
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3 p-col-fixed" style="width:200px">        
        <Button class="dark-btn mt-30 wl-100"  @click="isAddEmployeeModalOpened=true" label="NEW EMPLOYEE"/>
      </div>
    </form>

    <div class="card margin-bottom overflow-visible no-padding w-form my-20">    
      <div class="card-content min-height-140">
			<DataTable 
				ref="dt"
				:value="data" 
				class="p-datatable-customers p-datatable-sm p-datatable-striped p-datatable-bordered" 
				showGridlines
				:rows="10" 
				style="margin-bottom: 20px" 
				:paginator="true"
				:lazy="true"				
				scrollDirection="both"
				:loading="isLoading"
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
				:rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
				
				<Column field="NUM" header="Number" :sortable="true" :style="{'width':'300px'}">
				</Column>
				
				<Column field="FIRSTNAME" header="First Name" :sortable="true" :style="{'width':'300px'}">
					
				</Column>
				
				<Column field="SURNAME" header="Sur Name" :sortable="true" :style="{'width':'300px'}">
					
				</Column>
				<Column field="MOBILE" header="Mobile" :sortable="true" :style="{'width':'200px'}">
					
				</Column>
				
				
				<Column field="EMAIL" header="E-mail" :sortable="true" :style="{'width':'300px'}">
					
				</Column>
				
				<Column field="RATING" :sortable="true" :style="{'width':'300px'}">
					<template #header>
						<span>Rating</span>
                    </template>
					<template #body>
						<Rating modelValue="5" :stars="5"  :cancel="false"/>
					</template>
				</Column>
				<Column field="DATE" header="Start Date" :sortable="true" :style="{'width':'100px'}">
					
				</Column>
				<Column field="INFO" :style="{'width':'160px'}">
					<template #header>
						<span>Info</span>
                    </template>
					<template #body>
						<router-link to="#" @click="isEditEmployeeModalOpened=true">Edit details</router-link>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</div>
</template>

<script>
import ProductService from '../service/ProductService';
import EventService from '../service/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Tooltip from 'primevue/tooltip';

export default {
	directives: {
	'tooltip': Tooltip,
  	},
	data() {
		return {
			ratingValue: '',
			isAddEmployeeModalOpened: false,
			isEditEmployeeModalOpened: false,
			isLoading: false,
			data: [{'NUM':'P-2020',
			'AS_NAME':'Volvo n12',
			'NAME':'for_volvo',
			'CHECKLIST':'For_volvo',
			'DIAGNOSTICS':'0',
			'EMPLOYEE':'Jack Nickson',
			'ROLE':'driver',
			'TYPE':'Daily',
			'FAILREASON':'Not working',
			'QUESTION':'Visually check chassis, suspension including air bags, check cab & body for damage',
			'NOTES':'Sed ut perspiciatis unde omnis iste natus error eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.',
			'PHOTO':'View photo',
			'NUMBER':'E - 17',
			'FIRSTNAME':'Mark',
			'SURNAME':'Radford',
			'MOBILE':'+3040034445',
			'PHONE':'199122',
			'EMAIL':'mr@mail.com',
			'REGISTRATION':'TD61PF',
			'MAKE':'Volvo',
			'MODEL':'FH',
			'COLOR':'White',
			'YEAR':'2005',
			'GROUPS':'AUSTRALIA',
			'INFO':'Edit details',
			'MILEAGE':'2.567km',
			'HOURS':'4d 3h',
			'MAXSPEED':'67 km/h',
			'AVERAGESPEED':'37 km/h',
			'FUELUSED':'45 L',
			'DATE':'06/10/2020 12:12:40'},
			{'NUM':'P-2019',
			'NAME':'for_volvo',
			'AS_NAME':'Volvo n12',
			'CHECKLIST':'For_volvo',
			'DIAGNOSTICS':'0',
			'EMPLOYEE':'Carl Nickson',
			'ROLE':'manager',
			'TYPE':'Daily',      
			'FAILREASON':'Not working',
			'QUESTION':'Visually check chassis, suspension including air bags, check cab & body for damage',
			'NOTES':'Sed ut perspiciatis unde omnis iste natus error eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.',
			'PHOTO':'View photo',
			'NUMBER':'E - 17',
			'FIRSTNAME':'Mark',
			'SURNAME':'Radford',
			'MOBILE':'+3040034445',
			'PHONE':'199122',
			'EMAIL':'mr@mail.com',
			'REGISTRATION':'TD61PF',
			'MAKE':'Volvo',
			'MODEL':'FH',
			'COLOR':'White',
			'YEAR':'2005',
			'GROUPS':'AUSTRALIA',
			'INFO':'Edit details',
			'MILEAGE':'2.567km',
			'HOURS':'4d 3h',
			'MAXSPEED':'67 km/h',
			'AVERAGESPEED':'37 km/h',
			'FUELUSED':'45 L',
			'DATE':'06/10/2020 12:12:40'},
			{'NUM':'P-2018',
			'NAME':'for_volvo',
			'AS_NAME':'DAF 45G',
			'CHECKLIST':'DAF',
			'DIAGNOSTICS':'0',
			'EMPLOYEE':'Alex Nickson',
			'ROLE':'driver',
			'TYPE':'Monthly',
			
			'FAILREASON':'Not working',
			'QUESTION':'Visually check chassis, suspension including air bags, check cab & body for damage',
			'NOTES':'Sed ut perspiciatis unde omnis iste natus error eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.',
			'PHOTO':'View photo',
			'NUMBER':'E - 17',
			'FIRSTNAME':'Mark',
			'SURNAME':'Radford',
			'MOBILE':'+3040034445',
			'PHONE':'199122',
			'EMAIL':'mr@mail.com',
			'REGISTRATION':'TD61PF',
			'MAKE':'Volvo',
			'MODEL':'FH',
			'COLOR':'White',
			'YEAR':'2005',
			'GROUPS':'AUSTRALIA',
			'INFO':'Edit details',
			'MILEAGE':'2.567km',
			'HOURS':'4d 3h',
			'MAXSPEED':'67 km/h',
			'AVERAGESPEED':'37 km/h',
			'FUELUSED':'45 L',
			'DATE':'06/10/2020 12:12:40'},],
			calendarFromValue: null,
			calendarToValue: null,
			selectedChecklist: 'data',
			checklists: [
			/* {name: 'Cars', code: 'data'},
				{name: t('TOP_USAGE_MSG003'), code: 'sms'},*/
			],

			tasksCheckbox: [],
			dropdownCities: [
				{name: 'New York', code: 'NY'},
				{name: 'Rome', code: 'RM'},
				{name: 'London', code: 'LDN'},
				{name: 'Istanbul', code: 'IST'},
				{name: 'Paris', code: 'PRS'}
			],
			dropdownCity: null,
			options: {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2019-01-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true
			},
			events: null,
			products: null,
			selectedProducts: null,
			lineData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'First Dataset',
						data: [65, 59, 80, 81, 56, 55, 40],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860'
					},
					{
						label: 'Second Dataset',
						data: [28, 48, 40, 19, 86, 27, 90],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e'
					}
				]
			},
		}
	},
	productService: null,
	eventService: null,
	created() {
		this.productService = new ProductService();
		this.eventService = new EventService();
	},
	mounted() {
		this.productService.getProductsSmall().then(data => this.products = data);
		this.eventService.getEvents().then(data => this.events = data);

		let afId = this.$route.query['af_id'];
        if (afId) {
            let today = new Date();
            let expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*7);
            document.cookie = 'primeaffiliateid=' + afId + ';expires=' + expire.toUTCString() + ';path=/; domain:primefaces.org';
        }
	},
	methods: {
		async loadLazyData() {
			this.isLoading = true;
			//let params = {
				/*MajorToken: this.MajorToken,
				MinorToken: this.MinorToken,

				type: this.selectedChecklist,
				solution: this.selectedSolution,
				prdt: this.selectedProduct,
				RAG: this.selectedDeviceStatus,
				status: this.selectedSimStatus,
				time: this.selectedPeriod,
				q: this.searchDevice,*/
			//}

			this.isLoading = false;
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		}
	}
}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 960px) {
		::v-deep(.p-datatable) {
			&.p-datatable-customers {
				.p-datatable-thead > tr > th,
				.p-datatable-tfoot > tr > td {
					display: none !important;
				}

				.p-datatable-tbody > tr {
					border-bottom: 1px solid #dee2e6;
					> td {
						text-align: left;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 0 none !important;
						width: 100% !important;
						float: left;
						clear: left;
						border: 0 none;

						.p-column-title {
							padding: .4rem;
							min-width: 30%;
							display: inline-block;
							margin: -.4rem 1rem -.4rem -.4rem;
							font-weight: bold;
						}

						.p-progressbar {
							margin-top: .5rem;
						}
					}
				}
			}
		}
	}
</style>
