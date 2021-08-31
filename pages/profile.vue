<template>
    <div class="profile d-flex flex-column">
        <div class="text-center">
            <img src="/images/avatar.png" class="rounded-circle mb-4" alt="Profile Photo">
            <h4 class="text-primary">Administrator</h4>
            <p>{{ email.toUpperCase() }}</p>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Profile',
        layout: 'main',

        data(){
            return {
                email: 'admin@blockchain.emr'
            }
        },

        created(){
            this.changePageTitle('Profile');
        },

        methods: {
            ...mapActions(['setPageTitle']),

            changePageTitle(pageTitle){
                this.setPageTitle(pageTitle)
            }
        }
    }
</script>

<style>
    .profile{
        width: 50%;
        margin: auto;
    }
    
    .profile img {
        width: 180px;
        height: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>