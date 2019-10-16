<template>
  <iframe :src="artsrc" width="100%" height="100%" frameborder="0"/>
</template>
<script>
import { articleShow } from '@/api/article'
export default {
  components: {

  },
  data() {
    return {
      id: this.$route.query.id,
      artsrc: ''
    }
  },
  created() {
    this.getShow()
  },
  methods: {
    async getShow() {
      const res = await articleShow({ id: this.id })
      if (res === 'err') { return }
      this.artsrc = res.data
    }
  }
}

</script>
<style lang="less">

</style>

