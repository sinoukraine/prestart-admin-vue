<template>
<div class="p-grid p-fluid dashboard">
	<div class="p-col-12 p-lg-4">
		<div class="card summary bg-color-green">
			<span class="title">Good</span>
			<span class="detail">Number of drivers rated 4-5 stars</span>
			<span class="count visitors">23</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary bg-color-orange">
			<span class="title">Middle</span>
			<span class="detail">Number of drivers rated 3 stars</span>
			<span class="count purchases">12</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary bg-color-red">
			<span class="title">Bad</span>
			<span class="detail">Number of drivers rated 1-2 stars</span>
			<span class="count revenue">3</span>
		</div>
	</div>	

	<div class="p-grid nested-grid px-7">
		<div class="p-col-12 p-lg-8">
            <DataTable 
				ref="dt"
				:value="data" 
				class="p-datatable-customers p-datatable-sm p-datatable-striped p-datatable-bordered" 
				showGridlines
				:rows="10" 
				style="margin-bottom: 20px" 
				:paginator="false"
				:lazy="true"				
				scrollDirection="both"
				:loading="isLoading"
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
				:rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
				
				<Column field="NUM" header="Number" :sortable="true" :style="{'width':'160px'}">
				</Column>
				
				<Column field="FIRSTNAME" header="Name" :sortable="true" :style="{'width':'160px'}">
					
				</Column>
				
				<Column field="RATING" :sortable="true" :style="{'width':'260px'}">
					<template #header>
						<span>Rating</span>
                    </template>
					<template #body>
						<Rating modelValue="5" :stars="5"  :cancel="false"/>
					</template>
				</Column>
				
				<Column field="AS_NAME" header="Asset" :sortable="true" :style="{'width':'200px'}">
					
				</Column>
				
				
				<Column field="MILEAGE" header="KM traveled" :sortable="true" :style="{'width':'220px'}">
					
				</Column>
				
				<Column field="HOURS" header="Time" :sortable="true" :style="{'width':'100px'}">
					
				</Column>
				<Column field="FUELUSED" header="Fuel Usagee" :sortable="true" :style="{'width':'200px'}">
					
				</Column>
			</DataTable>
		</div>
		
		<div class="p-col-12 p-lg-4">
			<div class="p-grid">
				<div class="p-col-12 p-lg-12">
					<Panel header="Trips" style="">	
						<div class="p-grid p-fluid dashboard">
							<div class="p-col-7 center">					
								<Chart type="pie" :data="pieData" class="p-pie" :options="pieOptions" />
							</div>
							<div class="p-col-5 center">
								<div>
									<div style="display: flex;">
										<div class="square" style="background-color: rgb(58,170,53);"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Personal</div>
									</div>
									<div style="display: flex;">
										<div class="square" style="background-color: #36A2EB;"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Business</div>
									</div>
								</div>
							</div>
						</div>
					</Panel>
				</div>
				
				<div class="p-col-12 p-lg-12">
					<Panel header="Faults Status" style="">	<div class="p-grid p-fluid dashboard">
							<div class="p-col-7 center">					
								<Chart type="pie" :data="pie1Data" class="p-pie" :options="pie1Options"  style=""/>
							</div>
							<div class="p-col-5 center">
								<div>
									<div style="display: flex;">
										<div class="square" style="background-color: rgb(58,170,53);"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Completed</div>
									</div>
									<div style="display: flex;">
										<div class="square" style="background-color: #36A2EB;"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Approved</div>
									</div>
									<div style="display: flex;">
										<div class="square" style="background-color: rgb(242,145,0);"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Hight Priority</div>
									</div>
									<div style="display: flex;">
										<div class="square" style="background-color: rgb(227,15,19);"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">Urgent</div>
									</div>
									<div style="display: flex;">
										<div class="square" style="background-color: #333"></div>
										<div class="font-12 color-grey" style="padding: 0px 15px;">No Status</div>
									</div>
								</div>
							</div>
						</div>
					</Panel>
				</div>
			</div>
		</div>
    </div>

	<div class="p-col-12 p-lg-12 ">
		<Panel header="Chart" style="height: 100%">	
			<Chart type="bar" :data="basicData" :options="basicOptions" />
		</Panel>
	</div>
</div>
</template>

<script>
import ProductService from '../service/ProductService';
import EventService from '../service/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
	data() {
		return {
			ratingValue: '',
			basicData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    {
                        label: 'Business',
                        backgroundColor: '#36A2EB',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Personal',
                        backgroundColor: 'rgb(58,170,53)',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            },
            basicOptions: null,
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
			'DATE':'06/10/2020 12:12:40'},
			{'NUM':'P-2020',
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
            pieData: {
				labels: ['Business','Personal'],
				datasets: [
					{
						data: [300, 150],
						backgroundColor: [
							"#36A2EB",
							"rgb(58,170,53)"
						],
						hoverBackgroundColor: [
							"#36A2EB",
							"rgb(58,170,53)"
						]
					}
				]
			},
			pie1Options: {
				legend: {
					display: false,
				}				
			},
			pieOptions: {
				legend: {
					display: false,
				}				
			},
            pie1Data: {
				labels: ['Urgent','Hight Priority','Approved','Completed','No Status'],
				datasets: [
					{
						data: [300, 150, 80, 50, 0],
						backgroundColor: [
							"rgb(227,15,19)",
							"rgb(242,145,0)",
							"#36A2EB",
							"rgb(58,170,53)",
							"#333"
						],
						hoverBackgroundColor: [
							"rgb(227,15,19)",
							"rgb(242,145,0)",
							"#36A2EB",
							"rgb(58,170,53)",
							"#333"
						]
					}
				]
			},
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
		//this.eventService = new EventService();
	},
	mounted() {
		this.productService.getProductsSmall().then(data => this.products = data);
		//this.eventService.getEvents().then(data => this.events = data);

		let afId = this.$route.query['af_id'];
        if (afId) {
            let today = new Date();
            let expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*7);
            document.cookie = 'primeaffiliateid=' + afId + ';expires=' + expire.toUTCString() + ';path=/; domain:primefaces.org';
        }
	},
	methods: {
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
