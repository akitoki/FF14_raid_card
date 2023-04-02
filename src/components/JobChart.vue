<template lang="pug">
.job-chart-column(v-if="Columns > 0")
  select(v-model="selectJob1")
    option(v-for="job in jobs" :value="job.id") {{job.name}}
  input(type="number" id="jobChartPoint1" value="50" @change="jobChartPoint1" min="0" max="100" placeholder="1~100までを設定")
.job-chart-column(v-if="Columns > 1")
  select(v-model="selectJob2")
    option(v-for="job in jobs" :value="job.id") {{job.name}}
  input(type="number" id="jobChartPoint2" value="50" @change="jobChartPoint2" min="0" max="100")
.job-chart-column(v-if="Columns > 2")
  select(v-model="selectJob3")
    option(v-for="job in jobs" :value="job.id") {{job.name}}
  input(type="number" id="jobChartPoint3" value="50" @change="jobChartPoint3" min="0" max="100")
.job-chart-column(v-if="Columns > 3")
  select(v-model="selectJob4")
    option(v-for="job in jobs" :value="job.id") {{job.name}}
  input(type="number" id="jobChartPoint4" value="50" @change="jobChartPoint4" min="0" max="100")
.job-chart-column(v-if="Columns > 4")
  select(v-model="selectJob5")
    option(v-for="job in jobs" :value="job.id") {{job.name}}
  input(type="number" id="jobChartPoint5" value="50" @change="jobChartPoint5" min="0" max="100")
button(type="button" @click="addJob" v-if="Columns < 5") ジョブを増やす
button(type="button" @click="deleteJob" v-if="Columns > 1") ジョブを減らす
</template>

<script>
export default {
  name: 'JobChart',
  data() {
    return {
      Columns: 1,
      selectJob1: 'Paladin',
      selectJob2: 'Paladin',
      selectJob3: 'Paladin',
      selectJob4: 'Paladin',
      selectJob5: 'Paladin',
      jobs: [
        {name:'ナイト', id: 'Paladin'},
        {name:'戦士', id: 'Warrior'},
        {name:'暗黒騎士', id: 'DarkKnight'},
        {name:'ガンブレイカー', id: 'Gunbreaker'},
        {name:'白魔導士', id: 'WhiteMage'},
        {name:'学者', id: 'Scholar'},
        {name:'占星術師', id: 'Astrologian'},
        {name:'賢者', id: 'Sage'},
        {name:'モンク', id: 'Monk'},
        {name:'竜騎士', id: 'Dragoon'},
        {name:'忍者', id: 'Ninja'},
        {name:'侍', id: 'Samurai'},
        {name:'リーパー', id: 'Reaper'},
        {name:'吟遊詩人', id: 'Bard'},
        {name:'機工士', id: 'Machinist'},
        {name:'踊り子', id: 'Dancer'},
        {name:'黒魔導士', id: 'BlackMage'},
        {name:'召喚士', id: 'Summoner'},
        {name:'赤魔導士', id: 'RedMage'}
      ],
    }
  },
  watch: {
    selectJob1(value) {
      this.$store.commit("selectJob1", value);
    },
    selectJob2(value) {
      this.$store.commit("selectJob2", value);
    },
    selectJob3(value) {
      this.$store.commit("selectJob3", value);
    },
    selectJob4(value) {
      this.$store.commit("selectJob4", value);
    },
    selectJob5(value) {
      this.$store.commit("selectJob5", value);
    }
  },
  methods: {
    addJob() {
      this.Columns = this.Columns + 1
      this.$store.dispatch("jobCountPlus")
    },
    deleteJob() {
      this.Columns = this.Columns - 1
      this.$store.dispatch("jobCountMinus")
    },
    jobChartPoint1() {
      let jobChartPointValue = document.getElementById('jobChartPoint1')
      if (jobChartPointValue.value > 100) {
        jobChartPointValue.value = 100
      }
      this.$store.commit("jobPoint1", jobChartPointValue.value);
    },
    jobChartPoint2() {
      let jobChartPointValue = document.getElementById('jobChartPoint2')
      if (jobChartPointValue.value > 100) {
        jobChartPointValue.value = 100
      }
      this.$store.commit("jobPoint2", jobChartPointValue.value);
    },
    jobChartPoint3() {
      let jobChartPointValue = document.getElementById('jobChartPoint3')
      if (jobChartPointValue.value > 100) {
        jobChartPointValue.value = 100
      }
      this.$store.commit("jobPoint3", jobChartPointValue.value);
    },
    jobChartPoint4() {
      let jobChartPointValue = document.getElementById('jobChartPoint4')
      if (jobChartPointValue.value > 100) {
        jobChartPointValue.value = 100
      }
      this.$store.commit("jobPoint4", jobChartPointValue.value);
    },
    jobChartPoint5() {
      let jobChartPointValue = document.getElementById('jobChartPoint5')
      if (jobChartPointValue.value > 100) {
        jobChartPointValue.value = 100
      }
      this.$store.commit("jobPoint5", jobChartPointValue.value);
    },
  }
}
</script>
