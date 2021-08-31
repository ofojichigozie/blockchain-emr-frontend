<template>
    <div>
        <div class="d-flex">
            <input type="text" placeholder="Enter patient's ID" v-model="patientID2" class="form-control">
            <button @click="searchPatient" class="btn btn-primary">Search</button>
        </div>

        <h4 class="mt-5">Add new patient</h4>
        <p v-show="feedback.status != -1" :style="'color: ' + (feedback.status === 1 ? '#009F00;' : '#EF0000;')">
            <i v-show="feedback.status == 1" class="fa fa-check-circle"></i>
            <i v-show="feedback.status == 0" class="fa fa-times-circle"></i>
            {{ feedback.message }}
        </p>
        <form class="add-patient-form" @submit.prevent="addNewPatient">
            <div class="row">
                <div class="col-12 col-md-6 mb-2">
                    <label for="first-name">First name</label>
                    <input type="text" class="form-control" id="first-name" v-model="firstName" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <label for="last-name">Last name</label>
                    <input type="text" class="form-control" id="last-name" v-model="lastName" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <label for="phone-number">Phone number</label>
                    <input type="tel" class="form-control" id="phone-number" v-model="phoneNumber" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <label for="dob">Date of birth</label>
                    <input type="date" class="form-control" id="dob" v-model="dob" required>
                </div>
                <div class="col-12 col-md-6 mt-2">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" v-model="address" required>
                </div>
                <div class="col-12 col-md-6 mt-2">
                    <label for="patient-id">Patient's ID</label>
                    <input type="text" class="form-control" id="patient-id" v-model="patientID" readonly required>
                </div>
                <div class="col-12 mt-4">
                    <input v-show="!isProcessing" type="submit" value="submit" class="btn btn-primary"/>
                    <img v-show="isProcessing" src="/images/loading.gif" alt="Loading">
                </div>
                <div class="mt-3 bg-dark p-2" style="border-radius: 10px;">
                    <h6>After registration, patient's credential address appears here. The patient ID and credential address are keys to a patients health record.</h6>
                    <p>{{ credentialAddress }}</p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Patients',
        layout: 'main',
        
        data(){
            return {
                // Patient's details
                firstName: '',
                lastName: '',
                phoneNumber: '',
                dob: '',
                address: '',
                patientID: '0000',
                patientID2: '', // Used for search
                feedback: {
                    status: -1,
                    message: ''
                },
                isProcessing: false,
                credentialAddress: ''
            }
        },

        created(){
            this.changePageTitle('Patients');

            this.getNewPatientIDFromServer()
                .then(response => {
                    this.patientID = response.data.newID;
                })
                .catch(error => {
                    alert(error);
                })
        },

        methods: {
            ...mapActions({
                setPageTitle: 'setPageTitle',
                getNewPatientIDFromServer: 'patients/getNewPatientIDFromServer',
                checkPatientOnServer: 'patients/checkPatientOnServer',
                getPatientFromServer: 'patients/getPatientFromServer',
                addPatientToServer: 'patients/addPatientToServer'
            }),

            changePageTitle(pageTitle){
                this.setPageTitle(pageTitle)
            },

            addNewPatient(){

                const newPatient = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    dob: this.dob,
                    address: this.address,
                    patientID: this.patientID
                }

                // Clear previous messages, if any
                this.feedback = {
                    status: -1,
                    message: ''
                };

                this.processingMode = true;

                this.addPatientToServer(newPatient)
                .then(response => {
                    this.credentialAddress = response.data.patient.credentialAddress;

                    this.feedback = {
                        status: 1,
                        message: "New patient has been added"
                    };

                    this.processingMode = false;

                    // Reset all inputs
                    this.firstName = '';
                    this.lastName = '';
                    this.phoneNumber = '';
                    this.dob = '';
                    this.address = '';
                    this.patientID = 0;
                })
                .catch(e => {
                    this.feedback = {
                        status: 0,
                        message: e.message
                    };
                    this.processingMode = false;
                });
            },

            searchPatient(){
                const patientID2 = this.patientID2.trim();

                if(patientID2 != ''){
                    // Send request to server to check if patient exists
                    this.checkPatientOnServer(patientID2)
                        .then(response => {
                            if(!response.data.isFound){
                                alert('There is no patient with the specified ID');
                                return;
                            }
                            // Get the credential address
                            const credentialAddress = prompt('Enter patient credential address:');
                            if(credentialAddress != ''){
                                // Send request to server to get actual patient records
                                this.getPatientFromServer(credentialAddress)
                                    .then(response2 => {
                                        if(response2.data.patient != null){
                                            this.$router.push('/patients/add_record');
                                        }else{
                                            alert('There is no patient with the specified credential address');
                                        }
                                    })
                                    .catch(error2 => {
                                        alert(error2.message);
                                    });
                            }
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                }else{
                    alert('You\'ve not entered a patient ID');
                }
            }
        }
    }
</script>

<style>
    .add-patient-form input, .add-patient-form select {
        border-bottom: 1px solid #87b7fd;
    }
</style>