<template lang="pug">
header.header
  .header-inner
    h1.title
      span FINAL FANTAXY XIV
      span RAID CHARACTER CARD
.main-contents
  .about-page(v-if="pageCount === 1")
    .about-inner
      section
        h2.title このページについて
        p
          | FINAL FANTAXY XIVにおいて、高難易度レイド等のバトルコンテンツへ向けた自己紹介用のカードジェネレーターです。
          br
          | The Lodestoneの募集記事と一緒にSNSに投稿するなど、固定パーティーを探す際の補助的な用途にご活用ください。
      section
        h2.title カードサンプル
        p
          | このようなカードが作れます。
        .card-image
          img(:src="require('@/assets/images/card-sample.png')")
      section
        h2.title 動作確認環境
        ul
          li Google Chrome(バージョン111.0.5563.147)
          li Microsoft Edge(バージョン111.0.1661.6)
          li Safari(バージョン16.3)※
        p
          | ※Safariのみ画像をダウンロードする際に一部画像が表示されない不具合があります。ダウンロードし直せば解消されますので、お手数ですが再ダウンロードをお願いします。
        p
          | 上記以外のブラウザでの動作に関しては保証致しかねます。
        p.sp-text また、スマートフォンでの利用の際、カードのプレビュー表示がジェネレーターの仕様上スマートフォンの画面表示からはみ出て大きく表示されると思われます。ご不便をおかけしますがプレビューの確認の際はスワイプして表示をずらしてご確認ください。
      section
        h2.title ご利用にあたって
        p
          | 当ジェネレーターは製作者のフロントエンド学習を目的として作られました。そのため、ゲーム内の最新の状態が反映されていない場合があります。
          br
          | 不具合、ご意見などございましたら、
          a(href="https://twitter.com/akitoki" target="_blank") @akitoki
          | までご連絡ください。
          br
          | また当ジェネレーターにて作成したコンテンツを利用したことで利用者に何かしらのトラブルが発生したとしても、当方は責任を負いません。
          br
          | 以上同意していただけましたら下のボタンよりお進みください。
          .create-button
            button.card-create-button(@click="pageCountPlus") カードを作成する
      section
        h2.title 更新履歴
        ul
          li 2023.04.03 キャラクター画像登録時にトリミング機能を追加、Safariでご利用の際の注釈文を追加、曜日を登録し過ぎるとcopyrightが消えてしまうので暫定対策
          li 2023.04.03 ジョブ練度設定の部分に補足文言の追加
          li 2023.04.03 カード生成の際にフォントが正常に当たらない不具合、Safariで画像が正しいデザインで出力されない不具合修正
          li 2023.04.02 ジェネレーター公開
  .card-create(v-if="pageCount === 2")
    InputContents
    cardPreview
footer.footer
  .copyright
    | (C) SQUARE ENIX CO., LTD. All Rights Reserved.
    br
    | Copyright © A-HEAD All right reserved.

</template>
<script>
import InputContents from './components/InputContents.vue'
import CardPreview from './components/CardPreview.vue'
export default {
  name: 'App',
  data() {
    return {
      pageCount: 1
    }
  },
  components: {
    InputContents,
    CardPreview
  },
  mounted() {
    window.onload = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edge') === -1) {
        this.$store.commit("userAgent", 'Safari')
      } else {
        this.$store.commit("userAgent", 'other')
      }
    }
  },
  methods: {
    pageCountPlus() {
      this.pageCount = this.pageCount + 1
      this.$nextTick(function() {
        const header = document.querySelector('.header')
        header.scrollIntoView()
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
