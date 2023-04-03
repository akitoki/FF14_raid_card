<template lang="pug">
.card-section#card
  .card-inner
    h2.title CARD PREVIEW
    p.card-sp-text
      | 横スクロールでカードを動かして全体を確認してください
    #card-preview
      .card-wrap(:class="[cardType.class ? cardType.class : 'type-tank']")
        .frame
        .card-inner
          .card-column
            .chara-img
              img(:src="[imageUrl ? imageUrl : require('@/assets/images/no-image.png')]")
            .param
              .name-block
                .job-icon
                  img(:src="[cardType.class ? require(`@/assets/images/roles/${cardType.class}.png`) : require('@/assets/images/roles/type-tank.png')]")
                .profile
                  .name {{charactorName}}
                  .world {{dataCenter}} / {{world}}
              .contents-block
                .block-inner
                  .top-block
                    dl.type.contents
                      dt 募集コンテンツ
                      dd {{contentsName}}
                  .mid-block
                    .flex-block
                      dl.type.time
                        dt 活動可能時間
                        dd {{startTimeSelect}}時～{{endTimeSelect}}時
                      dl.type.vc
                        dt VC
                        dd {{vcCheck}}
                      dl.type.travel
                        dt DCトラベル
                        dd {{dcTravelCheck}}
                  .bottom-block
                    .flex-block
                      dl.type.period
                        dt クリア目標
                        dd {{clearPeriod}}
                      dl.type.frequency
                        dt 活動頻度
                        dd
                          span {{frequency}}{{standard}}
                          span.week(v-if="weekUpdate") （{{weekUpdate}}
                          span(v-if="weekUpdate") {{yesOrNo}}）
              .bottom-prof-block
                .job-chart.flex-block
                  .title PROFICIENCY LEVELS
                  .chart-block
                    ul.chart
                      li(v-if="jobCount > 0")
                        .icon
                          img(:src="[selectJob1.id ? require(`@/assets/images/jobs/${selectJob1.id}.png`) : require('@/assets/images/jobs/Paladin.png')]")
                        .meter-wrap
                          .meter(:class="`w${jobPoint1}`")
                      li(v-if="jobCount > 1")
                        .icon
                          img(:src="[selectJob2.id ? require(`@/assets/images/jobs/${selectJob2.id}.png`) : require('@/assets/images/jobs/Paladin.png')]")
                        .meter-wrap
                          .meter(:class="`w${jobPoint2}`")
                      li(v-if="jobCount > 2")
                        .icon
                          img(:src="[selectJob3.id ? require(`@/assets/images/jobs/${selectJob3.id}.png`) : require('@/assets/images/jobs/Paladin.png')]")
                        .meter-wrap
                          .meter(:class="`w${jobPoint3}`")
                      li(v-if="jobCount > 3")
                        .icon
                          img(:src="[selectJob4.id ? require(`@/assets/images/jobs/${selectJob4.id}.png`) : require('@/assets/images/jobs/Paladin.png')]")
                        .meter-wrap
                          .meter(:class="`w${jobPoint4}`")
                      li(v-if="jobCount > 4")
                        .icon
                          img(:src="[selectJob5.id ? require(`@/assets/images/jobs/${selectJob5.id}.png`) : require('@/assets/images/jobs/Paladin.png')]")
                        .meter-wrap
                          .meter(:class="`w${jobPoint5}`")
                .comment.flex-block
                  .title COMMENT
                  .comment-block
                    p {{comment}}
              .copyright (C) SQUARE ENIX CO., LTD. All Rights Reserved.
    .button-wrap
      button.download(@click="caputureImage")
        | カード画像をダウンロード
      p.safari-notice(v-if="userAgent === 'Safari'")
        | Safariのみ画像をダウンロードする際に一部画像が表示されない不具合があります。
        br
        | ダウンロードし直せば解消されますので、お手数ですが再ダウンロードをお願いします。
</template>

<script>
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'

export default {
  name: 'cardPreview',
  computed: {
    cardType() {
      return this.$store.state.cardType
    },
    imageUrl() {
      return this.$store.state.imageUrl
    },
    charactorName() {
      return this.$store.state.charactorName
    },
    dataCenter() {
      return this.$store.state.dataCenter
    },
    world() {
      return this.$store.state.world
    },
    contentsName() {
      return this.$store.state.contentsName
    },
    startTimeSelect() {
      return this.$store.state.startTime
    },
    endTimeSelect() {
      return this.$store.state.endTime
    },
    vcCheck() {
      return this.$store.state.vcCheck
    },
    dcTravelCheck() {
      return this.$store.state.dcTravelCheck
    },
    clearPeriod() {
      return this.$store.state.clearPeriod
    },
    frequency() {
      return this.$store.state.frequency
    },
    standard() {
      return this.$store.state.standard
    },
    weekUpdate() {
      return this.$store.state.week
    },
    yesOrNo() {
      return this.$store.state.yesOrNo
    },
    selectJob1() {
      return this.$store.state.selectJob1
    },
    selectJob2() {
      return this.$store.state.selectJob2
    },
    selectJob3() {
      return this.$store.state.selectJob3
    },
    selectJob4() {
      return this.$store.state.selectJob4
    },
    selectJob5() {
      return this.$store.state.selectJob5
    },
    jobPoint1() {
      return this.$store.state.jobPoint1
    },
    jobPoint2() {
      return this.$store.state.jobPoint2
    },
    jobPoint3() {
      return this.$store.state.jobPoint3
    },
    jobPoint4() {
      return this.$store.state.jobPoint4
    },
    jobPoint5() {
      return this.$store.state.jobPoint5
    },
    jobCount() {
      return this.$store.state.jobCount
    },
    comment() {
      return this.$store.state.comment
    },
    userAgent() {
      return this.$store.state.userAgent
    },
  },
  methods: {
    caputureImage() {
      const node = document.querySelector('#card-preview');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          FileSaver.saveAs(dataUrl, "raid-card.png");
        })
        .catch(function (error) {
          console.error('カード画像出力エラー', error);
        });
    }
  }
}

</script>
