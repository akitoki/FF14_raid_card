<template lang="pug">
label(v-for="cardType in cardTypeArr")
  input(type="radio" name="cardType" v-model="cardTypeSelect" :value="cardType.class")
  span {{ cardType.name }}
.image-input
  input(type="file" ref="preview" @change="imgUpload")
input(type="text" v-model="changeName" id="charactorName" placeholder="キャラクター名")
ServerSelect
input(type="text" v-model="contentsName" id="contentsName" placeholder="コンテンツ名（例：万魔殿パンデモニウム：煉獄編")
select(v-model="startTimeSelect")
  option(v-for="startTime in startTimesArr" :value="startTime") {{ startTime }}
select(v-model="endTimeSelect")
  option(v-for="endTime in endTimesArr" :value="endTime") {{ endTime }}
div
  label(v-for="vc in vcArr")
    input(type="radio" name="vc" :value="vc" v-model="vcSelect")
    span {{vc}}
div
  label(v-for="dcTravel in dcTravelArr")
    input(type="radio" name="dcTravel" :value="dcTravel" v-model="dcTravelSelect")
    span {{dcTravel}}
div
  select(v-model="clearPeriodSelect")
    option(v-for="clearPeriod in clearPeriodArr" :value="clearPeriod") {{ clearPeriod }}
div
  select(v-model="frequencySelect")
    option(v-for="frequency in frequencyArr" :value="frequency") {{ frequency }}
  select(v-model="standardSelect")
    option(v-for="standard in standardArr" :value="standard") {{ standard }}
div
  label(v-for="week in weekArr")
    input(type="checkbox" :value="week" name="week" v-model="weekUpdate")
    span {{week}}
  label(v-for="yesOrNo in yesOrNos")
    input(type="radio" name="yesOrNo" :value="yesOrNo" v-model="yesOrNoSelect")
    span {{yesOrNo}}
div
  JobChart
div
  textarea(v-model="comment" id="comment" placeholder="枠外に出る文字は省略されます")
</template>

<script>
import ServerSelect from './ServerSelect';
import JobChart from './JobChart';
export default {
  name: 'InputContents',
  components: {
    ServerSelect,
    JobChart
  },
  data() {
    return {
      cardTypeSelect: 'type-tank',
      cardTypeArr: [
        {name: 'TANK', class: 'type-tank'},
        {name: 'HEALER', class: 'type-healer'},
        {name: 'DPS', class: 'type-dps'}
      ],
      imageUrl: '',
      changeName: '',
      contentsName: '',
      startTimeSelect: '0',
      endTimeSelect: '0',
      startTimesArr: [...Array(24).keys()],
      endTimesArr: [...Array(32).keys()],
      vcSelect: '通話可能',
      vcArr: ['通話可能','聞き専','不可'],
      dcTravelSelect: '対応可能',
      dcTravelArr: ['対応可能', '対応不可'],
      clearPeriodSelect: '1週間以内',
      clearPeriodArr: ['1週間以内', '2週間以内', '3週間以内', '1ヶ月以内', '1～2ヶ月以内', '2～3ヶ月以内', '指定なし'],
      frequencySelect: '週1回',
      frequencyArr: ['週1回', '週2回', '週3回', '週4回', '週5回', '週6回', '週7回'],
      standardSelect: '前後',
      standardArr: ['前後', '以下', '以上'],
      weekUpdate: [],
      weekArr: ['月', '火', '水', '木', '金', '土', '日', '祝日'],
      yesOrNoSelect: '不可',
      yesOrNos: ['不可', '可能'],
      comment: ''
    }
  },
  methods: {
    imgUpload() {
      let image = this.$refs.preview.files[0]
      this.imageUrl = URL.createObjectURL(image)
      this.$store.commit("immageUpload", this.imageUrl);
    },
  },
  watch: {
    cardTypeSelect(value) {
      this.$store.commit("cardType", value);
    },
    changeName(value) {
      this.$store.commit("changeName", value);
    },
    contentsName(value) {
      this.$store.commit("contentsName", value);
    },
    startTimeSelect(value) {
      this.$store.commit("startTime", value);
    },
    endTimeSelect(value) {
      this.$store.commit("endTime", value);
    },
    vcSelect(value) {
      this.$store.commit("vcCheck", value);
    },
    dcTravelSelect(value) {
      this.$store.commit("dcTravelCheck", value);
    },
    clearPeriodSelect(value) {
      this.$store.commit("clearPeriod", value);
    },
    frequencySelect(value) {
      this.$store.commit("frequency", value);
    },
    standardSelect(value) {
      this.$store.commit("standard", value);
    },
    weekUpdate(value) {
      this.$store.commit("week", value);
    },
    yesOrNoSelect(value) {
      this.$store.commit("yesOrNo", value);
    },
    comment(value) {
      this.$store.commit("comment", value)
    }
  }
}
</script>
