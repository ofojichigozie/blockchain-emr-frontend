<template>
    <div class="card p-3">
        <div class="row">
            <p class="d-flex justify-content-end date">
                <span class="h6">{{ record.date }}</span>
            </p>
            <div class="col-12 col-md-4">
                <div>
                    <h6 class="h6">Disease/Condition</h6>
                    <span v-for="_condition in record.condition" :key="_condition" class="list-item">
                        {{ _condition }}
                    </span>
                </div>

                <div class="mt-3">
                    <h6 class="h6">Treatment</h6>
                    <span v-for="_treatmentType in record.treatmentType" :key="_treatmentType" class="list-item">
                        {{ _treatmentType }}
                    </span>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <p>
                    At the date of report, the patient has had a treatment duration of {{ record.treatmentDuration }} 
                    with a frequency of {{ record.treatmentFrequency }}. 
                    The date of last examination is {{ record.lastExaminationDate }}.
                    According to the doctor, "{{ record.description }}".
                </p>
                <div class="mt-3">
                    <span class="h6">Diagnosis:</span>
                    <span class="non-list-item">
                        {{ record.diagnosis }}
                    </span>
                    <span class="h6">Medication:</span>
                    <span class="non-list-item">
                        {{ record.medication }}
                    </span>
                </div>
                <!-- {{ record }} -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RecordItem',
        props: {
            record: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .list-item{
        background-color: rgb(63, 100, 129);
        color: #FFFFFF;
        padding: 3px;
        margin-right: 5px;
        border-radius: 5px;
    }
    .non-list-item{
        color: rgb(63, 100, 129);
        margin-right: 5px;
    }
    .date{
        color: rgb(63, 100, 129);
    }
</style>