<template>
  <div class="date-range">
    <div class="date-range__start">
      <label for="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        @input="getStartDate($event)"
      />
    </div>
    <div class="date-range__end">
      <label for="end">End date:</label>
      <input type="date" id="end" name="trip-end" @input="getEndDate($event)" :min="startDate" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DateRangeComponent",
  emits: ['onChangeStartDate', 'onChangeEndDate'],
  data() {
    return {
      startDate:'',
      endDate:''
    };
  },
  methods: {
    getEndDate(event) {
      this.endDate = event.target.value;
      this.$emit('onChangeEndDate', this.endDate);
    },
    getStartDate(event) {
      this.startDate = event.target.value;
      this.$emit('onChangeStartDate', this.startDate);
    },
  },
};
</script>
