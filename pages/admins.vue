<template>
    <div>
        
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Admins',
        layout: 'main',

        data(){
            return {

            }
        },

        created(){
            this.changePageTitle('Admins');
        },

        methods: {
            ...mapActions(['setPageTitle']),

            changePageTitle(pageTitle){
                this.setPageTitle(pageTitle)
            }
        }
    }
</script>