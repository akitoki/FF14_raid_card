<template lang="pug">
.card-section#card
  .card-inner
    h2.title CARD PREVIEW
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
                        dd {{startTime}}時～{{endTime}}時
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
                          span.week(v-if="week") （{{week}}
                          span(v-if="week") {{yesOrNo}}）
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
      button.download(@click="caputureImage" v-if="userAgent !== 'SmartPhone'")
        | カード画像をダウンロード
      button.download(@click="caputureImage" v-if="userAgent === 'SmartPhone'")
        | カード画像を表示
      p.safari-notice(v-if="userAgent === 'Safari'")
        | Safariのみ画像をダウンロードする際に一部画像が表示されない不具合があります。
        br
        | ダウンロードし直すことで解消される場合がありますので、お手数ですが再ダウンロードをお願いします。
.card-modal(v-if="spCardCreate !== ''")
  .modal-inner
    #card-image
    p 画像を長押しして端末に保存してください
    button(@click="cardModalClose") 閉じる
</template>
<script>
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'
import { mapState } from 'vuex'

export default {
  name: 'cardPreview',
  data() {
    return {
      spCardCreate: ''
    }
  },
  computed: mapState([
    'cardType',
    'imageUrl',
    'charactorName',
    'dataCenter',
    'dataCenter',
    'world',
    'contentsName',
    'startTime',
    'endTime',
    'vcCheck',
    'dcTravelCheck',
    'clearPeriod',
    'frequency',
    'standard',
    'week',
    'yesOrNo',
    'selectJob1',
    'selectJob2',
    'selectJob3',
    'selectJob4',
    'selectJob5',
    'jobPoint1',
    'jobPoint2',
    'jobPoint3',
    'jobPoint4',
    'jobPoint5',
    'jobCount',
    'comment',
    'userAgent'
  ]),
  methods: {
    caputureImage() {
      let target = this
      const node = document.querySelector('#card-preview');
      // Safariでは1回の描画で正常に表示されないので、同じ処理を何度も回す力業
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          domtoimage.toPng(node)
            .then(function (dataUrl2) {
              const img = new Image();
              img.src = dataUrl2;
              domtoimage.toPng(node)
                .then(function (dataUrl3) {
                  const img = new Image();
                  img.src = dataUrl3;
                  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                    target.spCardCreate = 'create'
                    target.$nextTick(function() {
                      document.getElementById('card-image').appendChild(img);
                    })
                  } else {
                    FileSaver.saveAs(dataUrl, "raid-card.png");
                  }
                })
            })
        })
        .catch(function (error) {
          console.error('カード画像出力エラー', error);
        });
    },
    cardModalClose() {
      this.spCardCreate = ''
    }
  }
}

</script>
