import axios from 'axios';

// Function to get configuration for making request
const getConfigHeader = () => {
    const authToken = localStorage.getItem('token') || null;

    return {
        headers: {
            'Authorization' : 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        }
    };
}

// Server
const serverURL = 'https://blockchain-emr.herokuapp.com/';

export const state = () => ({
    patient: null
})

export const getters = {
    getPatient: state => state.patient
}

export const actions = {
    getNewPatientIDFromServer: ({ commit }) => {
        return new Promise((resolve, reject) => {
            axios.get(`${serverURL}/api/v1/patients/newID`, getConfigHeader())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    addPatientToServer: ({ commit }, newPatient) => {
        return new Promise((resolve, reject) => {
            axios.post(`${serverURL}/api/v1/patients/`, newPatient, getConfigHeader())
            .then(response => {
                let patient = response.data.patient;
                commit('setPatient', patient);
                resolve(response);
            })
            .catch(error => {
                commit('setPatient', {});
                reject(error);
            });
        });
    },

    checkPatientOnServer: ({ commit }, patientID) => {
        return new Promise((resolve, reject) => {
            axios.get(`${serverURL}/api/v1/patients/verifyPatientID/${patientID}`, getConfigHeader())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    getPatientFromServer: ({ commit }, credentialAddress) => {
        return new Promise((resolve, reject) => {
            axios.get(`${serverURL}/api/v1/patients/verifyCredentialAddress/${credentialAddress}`, getConfigHeader())
            .then(response => {
                let patient = response.data.patient;
                commit('setPatient', patient);
                resolve(response);
            })
            .catch(error => {
                commit('setPatient', {});
                reject(error)
            });
        });
    },

    addPatientRecordOnServer: ({ commit }, record) => {
        return new Promise((resolve, reject) => {
            axios.patch(`${serverURL}/api/v1/patients/addRecord`, record, getConfigHeader())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error)
            });
        });
    }
}

export const mutations = {
    setPatient: (state, patient) => {
        state.patient = patient
    }
}