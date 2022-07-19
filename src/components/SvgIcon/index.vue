<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-'+name"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped >
.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: rgb(155, 154, 154);
  margin-right:15px;
}
</style>
