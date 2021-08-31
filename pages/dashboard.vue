<template>
    <div>
        
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Dashboard',
        layout: 'main',

        data(){
            return {

            }
        },

        created(){
            this.changePageTitle('Dashboard');
        },

        methods: {
            ...mapActions(['setPageTitle']),

            changePageTitle(pageTitle){
                this.setPageTitle(pageTitle)
            }
        }
    }
</script>