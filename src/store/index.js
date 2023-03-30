import { createStore } from 'vuex'

export default createStore({
  state: {
    cardType: [{name: 'TANK', class: 'type-tank'}],
    charactorName: 'Charactor Name',
    contentsName: '募集コンテンツ名',
    startTime: '0',
    endTime: '0',
    vcCheck: '通話可能',
    dcTravelCheck: '対応可能',
    clearPeriod: '1週間以内'
  },
  mutations: {
    cardType(state, value) {
      state.cardType.class = value
    },
    changeName(state, value) {
      state.charactorName = value
    },
    contentsName(state, value) {
      state.contentsName = value
    },
    startTime(state, value) {
      state.startTime = value
    },
    endTime(state, value) {
      state.endTime = value
    },
    vcCheck(state, value) {
      state.vcCheck = value
    },
    dcTravelCheck(state, value) {
      state.dcTravelCheck = value
    }
  }
})
