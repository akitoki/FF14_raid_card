<template lang="pug">
header.header
  .header-inner
    h1.title
      span FINAL FANTASY XIV
      span RAID CHARACTER CARD
.main-contents
  .about-page(v-if="pageCount === 1")
    .about-inner
      section
        h2.title このページについて
        p
          | FINAL FANTASY XIVにおいて、高難易度レイド等のバトルコンテンツへ向けた自己紹介用のカードジェネレーターです。
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
          li Mobile Safari(iOS 16.2)
        p
          | ※Safariのみ画像をダウンロードする際に一部画像が表示されない場合があります。ダウンロードし直せば解消される場合がありますので、お手数ですが再ダウンロードをお願いします。
        p
          | 上記以外のブラウザでの動作に関しては保証致しかねます。
        p.sp-text
          | スマートフォンでのご利用の場合、一部環境において端末をダークモードに設定していると正しい色でカードが出力されない場合がありますので、カードサンプルと同じような色になっていないと感じた場合はお手数ですが設定をライトモードに変更した上でお試しください。
          br
          | 現状でのダークモード不具合確認：Galaxyスマートフォンにプリインストールされているサムスン製のブラウザ
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
          li 2023.04.05 キャラクター名に '（アポストロフィ）と-（ハイフン）を入力できるように修正
          li 2023.04.04 スマートフォンの表示に対応
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
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        document.querySelector('body').classList.add('sp')
        this.$store.commit("userAgent", 'SmartPhone')
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
