import { createStore } from 'vuex'

export default createStore({
  state: {
    cardType: [{name: 'TANK', class: 'type-tank'}],
    imageUrl: '',
    charactorName: 'Charactor Name',
    dataCenter: 'Elemental',
    world: 'Aegis',
    contentsName: '募集コンテンツ名',
    startTime: '0',
    endTime: '0',
    vcCheck: '通話可能',
    dcTravelCheck: '対応可能',
    clearPeriod: '1週間以内',
    frequency: '週1回',
    standard: '前後',
    week: '',
    yesOrNo: '不可',
    selectJob1: [{name:'ナイト', id: 'paladin'}],
    selectJob2: [{name:'ナイト', id: 'paladin'}],
    selectJob3: [{name:'ナイト', id: 'paladin'}],
    selectJob4: [{name:'ナイト', id: 'paladin'}],
    selectJob5: [{name:'ナイト', id: 'paladin'}],
    jobPoint1: 50,
    jobPoint2: 50,
    jobPoint3: 50,
    jobPoint4: 50,
    jobPoint5: 50,
    jobCount: 1,
    comment: ''
  },
  mutations: {
    cardType(state, value) {
      state.cardType.class = value
    },
    immageUpload(state, url) {
      state.imageUrl = url
    },
    changeName(state, value) {
      state.charactorName = value
    },
    dataCenter(state, value) {
      state.dataCenter = value
    },
    world(state, value) {
      state.world = value
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
    },
    clearPeriod(state, value) {
      state.clearPeriod = value
    },
    frequency(state, value) {
      state.frequency = value
    },
    standard(state, value) {
      state.standard = value
    },
    week(state, value) {
      state.week = value.toString()
    },
    yesOrNo(state, value) {
      state.yesOrNo = value
    },
    selectJob1(state, value) {
      state.selectJob1.id = value
    },
    selectJob2(state, value) {
      state.selectJob2.id = value
    },
    selectJob3(state, value) {
      state.selectJob3.id = value
    },
    selectJob4(state, value) {
      state.selectJob4.id = value
    },
    selectJob5(state, value) {
      state.selectJob5.id = value
    },
    jobPoint1(state, value) {
      state.jobPoint1 = Number(value)
    },
    jobPoint2(state, value) {
      state.jobPoint2 = Number(value)
    },
    jobPoint3(state, value) {
      state.jobPoint3 = Number(value)
    },
    jobPoint4(state, value) {
      state.jobPoint4 = Number(value)
    },
    jobPoint5(state, value) {
      state.jobPoint5 = Number(value)
    },
    jobCountPlus(state) {
      state.jobCount++
    },
    jobCountMinus(state) {
      state.jobCount--
    },
    comment(state, value) {
      state.comment = value
    }
  },
  actions: {
    jobCountPlus(context) {
      context.commit('jobCountPlus')
    },
    jobCountMinus(context) {
      context.commit('jobCountMinus')
    }
  }
})
