<template>
  <div class="search-bar">
      <input type="text" placeholder="search" v-model="searchValue" @input="inputHandler($event)">
      <button type="button" class="search-bar__btn" @click="reset()">clear</button>
  </div>
</template>
<script>
export default {
  name: "SearchBarComponent",
  emit:['search-value'],
    data() {
    return {
        searchValue:'',
    }
    },
     methods: {
        inputHandler(event) {
            this.$emit('search-value', event.target.value);
            if(event.target.value.trim()){
                window.history.pushState({}, '', `?filter=${event.target.value}`);
            }else{
                window.history.pushState({}, '', '');
            }
        },
        reset(){
          this.searchValue = '';
          this.$emit('search-value', event.target.value);
          window.history.pushState({}, '', '');
        },
    },
}
</script>
