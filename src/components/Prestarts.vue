 <template>
<div class="p-grid p-fluid prestarts">
	<form class="p-grid p-fluid w-form mb-15 mt-10" @submit.prevent="loadLazyData">        
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3">
        <label>Checklist</label>
        <Dropdown v-model="selectedChecklist" :options="checklists" optionLabel="name" optionValue="code" :placeholder="'All checklists'" class="" />
      </div>
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3">
        <label>From Date</label>
        <div class="p-inputgroup">
		  <Calendar placeholder="Select Date" :showIcon="true" :showButtonBar="true" v-model="calendarFromValue"></Calendar>
        </div>
      </div>
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3">
        <label>To Date</label>
        <div class="p-inputgroup">
          <Calendar placeholder="Select Date" :showIcon="true" :showButtonBar="true" v-model="calendarToValue"></Calendar>
        </div>
      </div>
      <!--<div class="p-col-12 p-sm-6 p-md-3 p-lg-3" >
        
        <Dropdown v-model="selectedPeriod" :options="periods" optionLabel="name" optionValue="code" :placeholder="$t('TOP_USAGE_MSG004')" class="p-inputtext-sm"/>
        
      </div>-->
      <div class="p-col-12 p-sm-6 p-md-3 p-lg-3" >
        <!--<Dropdown v-model="selectedPeriod" :options="periods" optionLabel="name" optionValue="code" :placeholder="$t('TOP_USAGE_MSG004')" class="p-inputtext-sm"/>
        -->
        <label>Search</label>
        <div class="p-inputgroup">
          <InputText placeholder="Enter asset name..."/>
          <Button icon="pi pi-search" class="p-button-warning bg-lightgrey"/>
        </div>
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
				<Column field="NUMBER" header="#" :style="{'width':'180px'}">
					<!--<template #header>
						#
					</template>
					<template #body="slotProps">
						<img :src="'assets/layout/images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" />
					</template>-->
				</Column>
				<Column field="AS_NAME" header="Assets" :sortable="true" :style="{'width':'300px'}">
				</Column>
				<Column field="CHECKLIST" header="Checklist" :sortable="true" :style="{'width':'200px'}">
					
				</Column>
				<Column field="DIAGNOSTICS" :style="{'width':'160px'}">
					<template #header>
						<span>Diagnostics</span>
						<i class="icon icon-other-na-items mx-10 font-size-16" v-tooltip.bottom="'Marking colors:\n\nRed - Failed Items\nOrange - O/A Items\nGreen - Passed Items'"></i>
					</template>
					<template #body>
						<Badge value="2" severity="danger"></Badge>
						<Badge value="2" severity="warning"></Badge>
						<Badge value="2" severity="success"></Badge>
					</template>
				</Column>
				<Column field="EMPLOYEE" header="Employee" :sortable="true" :style="{'width':'300px'}">
					
				</Column>
				<Column field="PHOTO" header="Photo" :sortable="true" :style="{'width':'200px'}">
				</Column>
				<Column field="TRIPTYPE" header="Trip Type" :sortable="true" :style="{'width':'200px'}">
				</Column>
				<Column field="TYPE" :sortable="true" header="Period Type"  :style="{'width':'200px'}">
				</Column>
				<Column field="DATE" :sortable="true" header="Date"  :style="{'width':'200px'}">
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
			isLoading: false,
			data: [{
				'TRIPTYPE': 'TEST',
				'NUM':'P-2020',
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
			{
				'TRIPTYPE': 'TEST','NUM':'P-2019',
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
			{
				'TRIPTYPE': 'TEST','NUM':'P-2018',
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
