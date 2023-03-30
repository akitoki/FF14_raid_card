<template lang="pug">
#card
  .card-wrap(:class="[cardType.class ? cardType.class : 'type-tank']")
    .frame
    .card-inner
      .card-column
        .chara-img
          img(src="@/assets/images/no-image.png")
        .param
          .name-block
            .job-icon
              img(:src="[cardType.class ? require(`@/assets/images/roles/${cardType.class}.png`) : require('@/assets/images/roles/type-tank.png')]")
            .profile
              .name {{charactorName}}
              .world Elemental / Garuda
          .contents-block
            .block-inner
              .top-block
                dl.type.contents
                  dt コンテンツ
                  dd {{contentsName}}
              .mid-block
                .flex-block
                  dl.type.time
                    dt 活動時間
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
                    dd 2ヶ月以内
                  dl.type.frequency
                    dt 活動頻度
                    dd
                      span 週5回前後
                      span （土日除く）
          .bottom-prof-block
            .job-chart.flex-block
              .title JOB CHART
              .chart-block
                ul.chart
                  li
                    .icon
                      img(src="@/assets/images/jobs/Monk.png")
                    .meter-wrap
                      .meter.w100
                  li
                    .icon
                      img(src="@/assets/images/jobs/Monk.png")
                    .meter-wrap
                      .meter.w85
                  li
                    .icon
                      img(src="@/assets/images/jobs/Monk.png")
                    .meter-wrap
                      .meter.w50
                  li
                    .icon
                      img(src="@/assets/images/jobs/Monk.png")
                    .meter-wrap
                      .meter.w20
                  li
                    .icon
                      img(src="@/assets/images/jobs/Monk.png")
                    .meter-wrap
                      .meter.w15
            .comment.flex-block
              .title COMMENT
              .comment-block
                p コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
          .copyright (C) SQUARE ENIX CO., LTD. All Rights Reserved.

button(@click="caputureImage") 画像化
</template>

<script>
import domtoimage from 'dom-to-image';

export default {
  name: 'cardPreview',
  computed: {
    cardType() {
      return this.$store.state.cardType
    },
    charactorName() {
      return this.$store.state.charactorName
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
  },
  methods: {
    caputureImage() {
      const node = document.querySelector('.card-wrap');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          document.getElementById('card').remove();
          document.body.appendChild(img);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }

  }
}
/* ES6 */

</script>
