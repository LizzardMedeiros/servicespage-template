<template>
    <select :disabled="options.length == 0" v-model="selected">
        <option v-for="option in options" :key="option.id" :value="option.value">
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'DynamicSelect',
    props:['options'],
    data() {
        return {
            selected: null
        }
    },
    watch:{
        options: function(n){
            console.log(n);
        },
        selected: function(n){
            console.log(n);
        }
    }
}
</script>

<style>

</style>
