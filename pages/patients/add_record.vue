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

        <div class="d-flex justify-content-between mt-5">
            <h4>Add record</h4>
            <nuxt-link to="/patients/view_records" class="btn btn-outline-danger btn-sm">View records</nuxt-link>
        </div>

        <div class="row mt-4">
            <label class="h6">Disease or condition</label>
            <div class="col-6 col-md-4">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Neurological" v-model="condition">Neurological
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Psychological" v-model="condition">Psychological
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Epilepsy" v-model="condition">Epilepsy
                    </label>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Cardiovascular" v-model="condition">Cardiovascular
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Dementia" v-model="condition">Dementia
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Loss of Consciousness" v-model="condition">Loss of Consciousness
                    </label>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Diabetes" v-model="condition">Diabetes
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Hypoglycemia" v-model="condition">Hypoglycemia
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value="Orthopedic/Prosthetic" v-model="condition">Orthopedic/Prosthetic
                    </label>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12 col-md-4">
                <label class="h6" for="treatment-duration">How long have you treated this patient</label>
                <input type="text" class="form-control" id="treatment-duration" v-model="treatmentDuration">
            </div>
            <div class="col-12 col-md-4 px-md-3 my-3 my-md-0">
                <label class="h6" for="frequency">Frequency</label>
                <input type="text" class="form-control" id="frequency" v-model="treatmentFrequency">
            </div>
            <div class="col-12 col-md-4">
                <label class="h6" for="last-examination-date">Date of last examination</label>
                <input type="date" class="form-control" id="last-examination-date" v-model="lastExaminationDate">
            </div>
        </div>

        <div class="form-group mt-4">
            <label class="h6" for="description">Describe the nature, extent and Frequency of any of the patient's symptoms</label>
            <textarea class="form-control" rows="5" id="description" v-model="description"></textarea>
        </div>

        <div class="form-group mt-4">
            <label class="h6" for="diagnosis">Diagnosis (seperate with commas)</label>
            <textarea class="form-control" rows="5" id="diagnosis" v-model="diagnosis"></textarea>
        </div>

        <div class="mt-4">
            <label class="h6">Treatment</label>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" value="Medical" v-model="treatmentType">Medical
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" value="Surgical" v-model="treatmentType">Surgical
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" value="Device" v-model="treatmentType">Device
                </label>
            </div>
        </div>

        <div class="form-group mt-4">
            <label class="h6" for="medication">Medications (If any)</label>
            <textarea class="form-control" rows="5" id="medication" v-model="medication"></textarea>
        </div>

        <div class="form-group mt-4">
            <button v-show="!isProcessing" @click="addRecord" class="btn btn-primary">Submit</button>
            <img v-show="isProcessing" src="/images/loading.gif" alt="Loading">
        </div>

        <p v-show="feedback.status != -1" :style="'color: ' + (feedback.status === 1 ? '#009F00;' : '#EF0000;')" class="mt-2">
            <i v-show="feedback.status == 1" class="fa fa-check-circle"></i>
            <i v-show="feedback.status == 0" class="fa fa-times-circle"></i>
            {{ feedback.message }}
        </p>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Record',
        layout: 'main',
        
        data(){
            return {
                // Patient's details
                patientID: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                dob: '',
                address: '',

                condition: [],
                treatmentDuration: '',
                treatmentFrequency: '',
                lastExaminationDate: '',
                description: '',
                diagnosis: '',
                treatmentType: [],
                medication: '',

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
            },

            addRecord(){

                const patient = this.getPatient();

                if(patient == null){
                    this.feedback = {
                        status: 0,
                        message: 'No patient was loaded'
                    };
                    return;
                }

                const credentialAddress = patient.credentialAddress;
                
                const newRecord = {
                    credentialAddress: credentialAddress,
                    condition: this.condition,
                    treatmentDuration: this.treatmentDuration,
                    treatmentFrequency: this.treatmentFrequency,
                    lastExaminationDate: this.lastExaminationDate,
                    description: this.description,
                    diagnosis: this.diagnosis,
                    treatmentType: this.treatmentType,
                    medication: this.medication
                }

                // Clear previous messages, if any
                this.feedback = {
                    status: -1,
                    message: ''
                };

                this.isProcessing = true;

                this.addPatientRecordOnServer(newRecord)
                .then(response => {
                    this.feedback = {
                        status: 1,
                        message: "New record has been added"
                    };

                    this.isProcessing = false;

                    // Reset all inputs
                    this.condition = [];
                    this.treatmentDuration = '';
                    this.treatmentFrequency = '';
                    this.lastExaminationDate = '';
                    this.description = '';
                    this.diagnosis = '';
                    this.treatmentType = [];
                    this.medication = '';
                })
                .catch(e => {
                    this.feedback = {
                        status: 0,
                        message: e.message
                    };
                    this.isProcessing = false;
                });
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