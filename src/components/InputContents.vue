<template lang="pug">
.input-field-wrap
  .input-field-inner
    dl.input-column
      dt カードタイプ
      dd
        p.notice カードの背景、ロールアイコンが変わります
        label(v-for="cardType in cardTypeArr")
          input(type="radio" name="cardType" v-model="cardTypeSelect" :value="cardType.class")
          span {{ cardType.name }}
    dl.input-column
      dt キャラクター画像
      dd
        p.notice
          | 縦600px、縦300pxまたは2:1比率の縦長画像推奨。
          br
          | 画像を選択するとトリミング画面が表示されますので、お好みの部分でトリミングしてください。
        .image-input
          input(@change="setImage" type="file" name="image" accept="image/*")
        ImageCropper
    dl.input-column
      dt キャラクター名
      dd
        input.full-width(type="url" v-model="changeName" id="charactorName" placeholder="キャラクター名" @keyup="keyUpHalfSizeRestriction")
    dl.input-column
      dt DC/ワールド
      dd
        ServerSelect
    dl.input-column
      dt 募集コンテンツ名
      dd
        p.notice 募集するコンテンツを入力してください
        input.full-width(type="text" v-model="contentsName" id="contentsName" placeholder="例：万魔殿パンデモニウム：天獄編")
    dl.input-column
      dt 活動可能時間
      dd
        .select-wrapper
          select(v-model="startTimeSelect")
            option(v-for="startTime in startTimesArr" :value="startTime") {{ startTime }}
        span 時～
        .select-wrapper
          select(v-model="endTimeSelect")
            option(v-for="endTime in endTimesArr" :value="endTime") {{ endTime }}
        span 時
    dl.input-column
      dt VCの可否
      dd
        label(v-for="vc in vcArr")
          input(type="radio" name="vc" :value="vc" v-model="vcSelect")
          span {{vc}}
    dl.input-column
      dt DCトラベル対応
      dd
        label(v-for="dcTravel in dcTravelArr")
          input(type="radio" name="dcTravel" :value="dcTravel" v-model="dcTravelSelect")
          span {{dcTravel}}
    dl.input-column
      dt クリア目標
      dd
        p.notice 希望するおおよその攻略期間を選択してください
        .select-wrapper
          select(v-model="clearPeriodSelect")
            option(v-for="clearPeriod in clearPeriodArr" :value="clearPeriod") {{ clearPeriod }}
    dl.input-column
      dt 活動頻度
      dd
        p.notice 週にどれほど活動したいかの目安を選んでください
        .select-wrapper
          select(v-model="frequencySelect")
            option(v-for="frequency in frequencyArr" :value="frequency") {{ frequency }}
        .select-wrapper
          select(v-model="standardSelect")
            option(v-for="standard in standardArr" :value="standard") {{ standard }}
        .weekly
          p.notice 特定の曜日に活動できない、または活動ができるという場合その曜日を表示することができます
          .wrap
            label(v-for="week in weekArr")
              input(type="checkbox" :value="week" name="week" v-model="weekUpdate")
              span {{week}}
          .wrap
            label(v-for="yesOrNo in yesOrNos")
              input(type="radio" name="yesOrNo" :value="yesOrNo" v-model="yesOrNoSelect")
              span {{yesOrNo}}
    dl.input-column
      dt 可能なジョブおよび練度
      dd
        p.notice
          | 対応可能なジョブの選択と、そのジョブに対する練度を自己評価で0～100の間で入力してください（最大5つまで）
          br
          span 補足：今回一番出したいジョブを100とし、その他のジョブはそれに大して相対的にこれくらい、といったような具合で気楽に評価してください
        JobChart
    dl.input-column
      dt コメント
      dd
        p.notice
          | 自己紹介や意気込み、その他載せたい情報を記入してください
          br
          | 枠外にはみ出てしまう場合は省略されます
        textarea(v-model="comment" id="comment" placeholder="例：クリアに向けて頑張りますのでよろしくお願いします！")
  .scroll-preview(@click="scrollPreview") カードのプレビューを見る
.crop-modal-wrapper(v-if="imgSrc !== ''")
  .croppwer-container
    vue-cropper(
      ref="cropper"
      :guides="true"
      :view-mode="1"
      :auto-crop-area="1"
      :min-container-width="600"
      :min-container-height="600"
      :background="false"
      :rotatable="false"
      :src="imgSrc"
      :img-style="{ 'width': '300px', 'height': '600px' }"
      :aspect-ratio="targetWidth / targetHeight"
      drag-mode="crop"
    )
    p.notice.pc
      | マウスのスクロールで画像のズームを調整可能です
    p.notice.sp
      | ピンチイン、ピンチアウトで画像のズームを調整可能です
    button(@click="cropImage" v-if="imgSrc !== ''") トリミングを反映する
</template>

<script>
import ServerSelect from './ServerSelect';
import JobChart from './JobChart';
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'InputContents',
  components: {
    ServerSelect,
    JobChart,
    VueCropper
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
      comment: '',
      targetWidth: 1,
      targetHeight: 2,
      imgSrc: '',
      cropImg: '',
      filename: ''
    }
  },
  methods: {
    keyUpHalfSizeRestriction() {
      let tmp_value = this.changeName
      if(tmp_value){
        this.changeName = tmp_value.replace(/[^0-9a-zA-Z/ +]/g,'');
      }
    },
    scrollPreview() {
      const card = document.getElementById('card')
      card.scrollIntoView({behavior : 'smooth'})
    },
    setImage (e) {
      const file = e.target.files[0]
      this.filename = file.name
      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$store.commit("immageUpload", this.cropImg);
      this.imgSrc = ''
    }

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
    },
  },
}
</script>
