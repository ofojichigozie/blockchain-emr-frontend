<template>
    <div>
        <table class="table table-bordered table-light">
            <tbody>
                <tr class="font-bold">
                    <td>Patient ID:</td>
                    <td>{{ patientID }}</td>
                </tr>
                <tr>
                    <td class="font-bold">Full name:</td>
                    <td>{{ firstName + " " + lastName }}</td>
                    <td class="font-bold">Address:</td>
                    <td>{{ address }}</td>
                </tr>
                <tr>
                    <td class="font-bold">Date of birth:</td>
                    <td>{{ dob }}</td>
                    <td class="font-bold">Phone number:</td>
                    <td>{{ phoneNumber }}</td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-end mt-5">
            <nuxt-link to="/patients/add_record" class="btn btn-outline-danger btn-sm">Add record</nuxt-link>
        </div>

        <div class="mt-4">
            <RecordItem v-for="record in recordChain" :key="record.index" :record="record.data" class="mt-"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Record',
        layout: 'main',
        components: true,
        
        data(){
            return {
                // Patient's details
                patientID: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                dob: '',
                address: '',
                recordChain: [],

                feedback: {
                    status: -1,
                    message: ''
                },
                isProcessing: false,
                credentialAddress: ''
            }
        },

        computed: {
            
        },

        created(){
            this.changePageTitle('Records');
        },

        mounted(){
            const patient = this.getPatient();

            // Set the details
            if(patient != null){
                this.patientID = patient.patientID;
                this.firstName = patient.firstName;
                this.lastName = patient.lastName;
                this.phoneNumber = patient.phoneNumber;
                this.dob = patient.dob;
                this.address = patient.address;

                this.recordChain = patient.recordChain.blockchain.filter(block => {
                    return block.index !== 0
                });
            }

        },

        methods: {
            ...mapActions({
                setPageTitle: 'setPageTitle',
                addPatientRecordOnServer: 'patients/addPatientRecordOnServer'
            }),

            ...mapGetters({
                getPatient: 'patients/getPatient'
            }),

            changePageTitle(pageTitle){
                this.setPageTitle(pageTitle)
            }
        }
    }
</script>

<style>
    input[type="text"], input[type="number"] {
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #87b7fd;
    }
</style>