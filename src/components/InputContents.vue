<template lang="pug">
select(v-model="cardTypeSelect")
  option(v-for="cardType in cardTypeArr" :value="cardType.class") {{ cardType.name }}
input(type="text" v-model="changeName" id="charactorName" placeholder="キャラクター名")
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

  select(v-model="endTimeSelect")
    option(v-for="endTime in endTimesArr" :value="endTime") {{ endTime }}
</template>

<script>
export default {
  name: 'InputContents',
  data() {
    return {
      cardTypeSelect: 'type-tank',
      cardTypeArr: [
        {name: 'TANK', class: 'type-tank'},
        {name: 'HEALER', class: 'type-healer'},
        {name: 'DPS', class: 'type-dps'}
      ],
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
      clearPeriodArr: ['1週間以内', '2週間以内', '3週間以内', '1ヶ月以内', '1～2ヶ月以内', '2～3ヶ月以内', '指定なし'],
      frequencyArr: ['週1回', '週2回', '週3回', '週4回', '週5回', '週6回', '毎日'],
      standardArr: ['以下', '前後', '以上'],
      weekArr: ['月', '火', '水', '木', '金', '土', '日']
    }
  },
  watch: {
    cardTypeSelect: function(value) {
      this.$store.commit("cardType", value);
    },
    changeName: function(value) {
      this.$store.commit("changeName", value);
    },
    contentsName: function(value) {
      this.$store.commit("contentsName", value);
    },
    startTimeSelect: function(value) {
      this.$store.commit("startTime", value);
    },
    endTimeSelect: function(value) {
      this.$store.commit("endTime", value);
    },
    vcSelect: function(value) {
      this.$store.commit("vcCheck", value);
    },
    dcTravelSelect: function(value) {
      this.$store.commit("dcTravelCheck", value);
    },
  }
}
</script>
